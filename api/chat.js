const API_KEY = 'sk-cp-SJihtG-YQX-oAe0AqSfhQnksvlAJhUbTqunIfnHReW8knNFvYFReO9evqCkUOrt_CXQHXfSExiVQel4DiRre_cOlP68wKJbQDypJjR12okliy1eCRf56jGI';
const API_URL = 'https://api.minimaxi.com/v1/chat/completions';

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, stream = true } = req.body;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: stream
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // 设置 SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if (stream) {
      // 流式响应
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.write('data: [DONE]\n\n');
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (data && data !== '[DONE]') {
              // 转发数据
              res.write(line + '\n');
            }
          }
        }
      }

      res.end();
    } else {
      // 非流式响应
      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || '抱歉，我现在无法回答您的问题。';
      res.status(200).json({ response: aiResponse });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'AI服务暂时不可用，请稍后再试。' });
  }
};
