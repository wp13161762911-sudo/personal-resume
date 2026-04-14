import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  ChevronRight,
  BrainCircuit,
  Bot,
  Sparkles,
  Database,
  LineChart
} from 'lucide-react';
import ChatBot from './ChatBot';
import './index.css';

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Background */}
      <div
        className="fixed inset-0 z-[-1] opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${20 + scrollY * 0.05}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                       radial-gradient(circle at ${80 - scrollY * 0.02}% ${60 + scrollY * 0.05}%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)`
        }}
      />

      {/* Hero Section */}
      <header className="min-h-screen flex items-center pt-20 pb-10">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="flex-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-8 shadow-xl shadow-blue-500/20">
              <BrainCircuit className="text-white" size={40} />
            </motion.div>

            <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-medium text-muted mb-4 font-heading">
              AI 产品经理
            </motion.h2>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold mb-6 font-heading tracking-tight">
              王 鹏 <span className="gradient-text">Wang Peng</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-secondary mb-8 max-w-2xl leading-relaxed">
              7年产品经验 · 3年AI落地经验 · 专注 AI Agent 与 B端复杂SaaS
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-12">
              <a href="tel:13161762911" className="glass-card flex-center gap-3 px-6 py-3 rounded-full hover:bg-blue-500/10 cursor-pointer">
                <Phone size={20} className="text-blue-500" />
                <span className="font-medium text-sm md:text-base">131 6176 2911</span>
              </a>
              <a href="mailto:13161762911@163.com" className="glass-card flex-center gap-3 px-6 py-3 rounded-full hover:bg-purple-500/10 cursor-pointer">
                <Mail size={20} className="text-purple-500" />
                <span className="font-medium text-sm md:text-base">13161762911@163.com</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Summary Section */}
      <section className="section-padding relative">
        <div className="container relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
          >
            <Sparkles className="text-blue-500" /> 个人优势
          </motion.h2>

          <div className="grid-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex-center mb-6">
                <Bot className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading">AI Agent 工程化落地</h3>
              <p className="text-muted leading-relaxed">
                基于 Dify + Coze + FastGPT + Prompt 搭建 10+ 业务智能体，月产内容 5000+ 条，创作周期缩短 40%；通过 AI 出题、岗位模型生成等工具将单题成本从 10 元降至 1 元。
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex-center mb-6">
                <BrainCircuit className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading">企业级 AI 产品商业化</h3>
              <p className="text-muted leading-relaxed">
                从 0-1 搭建 AI 人才测评平台，签约宁波银行等 3 家百万级客户，LTV 超 500 万，完成近 2000 人技术测评 + 万级课程推荐。
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex-center mb-6">
                <Database className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading">复杂 B 端平台规模化</h3>
              <p className="text-muted leading-relaxed">
                7年 SaaS 经验，主导集团级平台客户从 30 家扩至 700 家，GMV 2200 万+，续约率提升 25%。
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex-center mb-6">
                <LineChart className="text-amber-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading">AI 开发工具链深度整合</h3>
              <p className="text-muted leading-relaxed">
                深度应用 Claude Code 编写自动化脚本与 Skill 扩展，自主搭建 OpenClaw，持续探索前沿 AI 工程化工具。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <Briefcase className="text-blue-500" /> 工作经历
          </motion.h2>

          <div className="space-y-12">
            {[
              {
                company: "北京卡车之家信息技术股份有限公司",
                role: "AI产品经理",
                date: "2025.06 - 2026.03",
                responsibilities: "负责规划并设计卡家营销内容生态的AI Agent产品矩阵，主导设计并落地AI选车（智能问答类）、用户舆情、KOL短视频脚本、新闻口播稿、营销策划方案、内容创作AI平台、新闻转载、GEO引流等多场景Agent产品。",
                achievements: [
                  "产能爆发：智能体单月生成内容量超5000条，有效支持日常运营与热点跟进，显著提升运营人效。",
                  "降本增效：通过短视频脚本、新闻口播稿等智能体应用，将内容创作周期平均缩短40%。"
                ]
              },
              {
                company: "北京无忧创想信息技术有限公司（51CTO）",
                role: "AI产品经理",
                date: "2023.10 - 2025.04",
                responsibilities: "负责企业培训KA业务线的AI产品创新与交付，主导设计并落地了一体化人才云AI测评、AI智投助手、AI学习小助手和AI出题工具（智能体）、AI审题工具、AI生成试题、AI生成岗位模型、AI能力测评等AI模块交付。",
                achievements: [
                  "标杆产品打造与规模化：主导“一体化人才云AI测评产品”V1.0的重构与交付，成功落地宁波银行等多家百万级标杆客户，并推动该解决方案成为公司高毛利产品线。",
                  "AI赋能与成本优化：将AI能力深度集成至核心产品与交付流程中，显著降低项目成本（如单题生产成本从10元降至1元）。",
                  "用户增长与体验提升：主导上线的“AI学习小助手”在C端平台获日访问超2000，一周内带动平台PV提升60%，UV提升30%。"
                ]
              },
              {
                company: "北京玻色量子科技有限公司",
                role: "AI产品经理",
                date: "2022.07 - 2023.08",
                responsibilities: "负责探索AI与量子计算在特定行业（如生物制药、交通）的产品化路径，包括AI量子云、机场噪声数据平台、AI数字人、AI论文检测等创新产品。",
                achievements: [
                  "前沿技术产品化：从0到1主导设计“量子直接通信云平台”，并成功交付北京量子院，为公司开辟软件服务创收路径（数百万）。",
                  "行业解决方案突破：主导“机场噪声监测数据平台”的产品设计，成功落地上海浦东、长沙机场等大型国际机场，打造交通领域的标杆案例。"
                ]
              },
              {
                company: "北大公学教育集团",
                role: "产品经理",
                date: "2018.06 - 2022.07",
                responsibilities: "负责核心SaaS平台的产品设计与迭代，负责SaaS（含集团云+政企云+校园云+CRM+电商的一体化的大型复杂SaaS综合平台）、网站、智能硬件IOT（AI考勤机、AI课件）等项目",
                achievements: [
                  "规模化增长：推动SaaS平台B端客户数从30家增长至700家，客户续约率提升25%。平台注册用户数突破10W+，MAU从1W+增长到3W+。",
                  "商业化成功：通过SaaS+电商模式，将在线订货商城年GMV从1600万提升至2200万以上，打造了公司首款千万级营收产品。"
                ]
              }
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass-card relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-2">{job.company}</h3>
                    <p className="text-accent font-medium">{job.role}</p>
                  </div>
                  <div className="badge">{job.date}</div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">核心职责</h4>
                  <p className="text-secondary leading-relaxed">{job.responsibilities}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">关键业绩</h4>
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-secondary">
                        <ChevronRight className="text-blue-500 shrink-0 mt-1" size={16} />
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-slate-900/5 dark:bg-white/5">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <Award className="text-blue-500" /> 项目亮点
          </motion.h2>

          <div className="grid-2 gap-8">
            {[
              {
                name: "AI营销智能体矩阵（卡车之家）",
                date: "2025.06 - 2026.03",
                desc: "战略级AI多模态创作与营销平台。",
                duties: [
                  "规划设计内容生成、营销策划等多场景AI智能体矩阵。",
                  "负责需求分析、提示词工程、工作流到智能体全流程设计。",
                  "协同研发与运营验证落地效果。"
                ],
                results: [
                  "部分智能体单月产出 5000+ 条内容。",
                  "创作周期缩短 40%，部分高频场景自动化。"
                ],
                tags: ["Dify", "Coze", "Agent"]
              },
              {
                name: "一体化人才云AI测评V1.0（无忧创想）",
                date: "2024.01 - 2025.04",
                desc: "行业首款AI自适应IT技能测评SaaS。",
                duties: [
                  "重构设计算法逻辑、题库、岗位模型等全业务流。",
                  "支持 POC、售前交付与投标。",
                  "协同AI团队生成内容降本。"
                ],
                results: [
                  "签约3家百万级头部客户（如宁波银行 LTV>500万）。",
                  "完成 2000+ 人技术测评与万级课程推荐。"
                ],
                tags: ["SaaS", "B端商业化", "AI自适应"]
              },
              {
                name: "AI小助手系列产品（无忧创想）",
                date: "2023.11 - 2024.08",
                desc: "C端及内部效率提升类AI工具。",
                duties: [
                  "设计RAG系统、大模型调用、问题分类器与工作流。",
                  "交付多条业务线，独立搭建AI出题智能体。"
                ],
                results: [
                  "AI学习小助手带动平台 PV+60%, UV+30%。",
                  "AI出题工具获兴业银行5星好评。"
                ],
                tags: ["RAG", "Prompt", "C端增长"]
              },
              {
                name: "AI量子直接通信云平台(玻色量子)",
                date: "2022.07 - 2022.12",
                desc: "量子云平台及行业应用探索。",
                duties: [
                  "设计算力调度、分子对接、量子通信云平台业务流。",
                  "标准化形成五岳量子云项目并进行商业推广。"
                ],
                results: [
                  "公司首个软件营收项目，创收数百万。",
                  "加固产业联盟合作，打造首个工程应用。"
                ],
                tags: ["量子计算", "云平台", "0-1构建"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-heading">{project.name}</h3>
                </div>
                <div className="badge mb-4 bg-slate-100 dark:bg-slate-800 text-muted border-none">{project.date}</div>

                <p className="font-medium text-primary mb-4 pb-4 border-b border-border">{project.desc}</p>

                <div className="mb-4">
                  <p className="text-sm font-bold text-muted mb-2">项目职责</p>
                  <ul className="text-sm text-secondary space-y-1 mb-4">
                    {project.duties.map((d, i) => <li key={i}>• {d}</li>)}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-bold text-muted mb-2">项目业绩</p>
                  <ul className="text-sm text-secondary space-y-1">
                    {project.results.map((r, i) => <li key={i}>• {r}</li>)}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2 gap-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4">
                <GraduationCap className="text-blue-500" /> 教育背景
              </h2>
              <div className="glass-card">
                <h3 className="text-xl font-bold font-heading mb-2">北京信息科技大学</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge">重点本科</span>
                  <span className="text-muted text-sm border-l border-slate-300 pl-3">2015.09 - 2019.06</span>
                </div>
                <p className="text-secondary font-medium text-lg">新能源科学与工程 (本科统招)</p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4">
                <Sparkles className="text-purple-500" /> 技能特长
              </h2>
              <div className="glass-card">
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex-center shrink-0">1</div>
                    <p className="text-secondary pt-1">精通 Axure、Xmind、Visio、Excel、Project 等工具</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex-center shrink-0">2</div>
                    <p className="text-secondary pt-1">熟练掌握 Excel、SQL、BDP 等数据分析能力</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex-center shrink-0">3</div>
                    <p className="text-secondary pt-1">精通英语口语交际，大学英语六级（CET-6）</p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border mt-12">
        <div className="container text-center">
          <p className="text-muted">© {new Date().getFullYear()} 王鹏. AI Product Manager.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;
