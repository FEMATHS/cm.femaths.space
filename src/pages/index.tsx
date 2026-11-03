import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';

import styles from './styles.module.css';
import HeroParticles from '../components/HeroParticles';
import IndexComment from './IndexComment';

const features = [
  {
    icon: '∑',
    title: '数值分析',
    color: '#3b82f6',
    image: '/img/1.png',
    imageAlt: '流体数值模拟结果',
    description:
      '研究偏微分方程（PDE）的数值解法：有限差分、有限元与谱方法。应用于热传导、波动传播与流体模拟等科学计算场景。',
  },
  {
    icon: '∇',
    title: '优化算法',
    color: '#8b5cf6',
    image: '/img/2.png',
    imageAlt: '凸优化算法的收敛轨迹示意图',
    description:
      '探索凸优化与非凸优化的经典方法：梯度下降、牛顿法与约束优化，聚焦等高线分析与最优解轨迹的可视化。',
  },
  {
    icon: 'π',
    title: '物理信息神经网络',
    color: '#ec4899',
    image: '/img/3.png',
    imageAlt: '流体动力学与神经网络示意图',
    description:
      '结合神经网络与物理模型，引入 PDE 约束、残差分析与自适应采样机制，广泛用于模拟自然过程与求解逆问题。',
  },
  {
    icon: 'λ',
    title: '深度学习',
    color: '#06b6d4',
    image: '/img/4.png',
    imageAlt: '卷积神经网络结构示意图',
    description:
      '聚焦卷积神经网络的结构与原理，涵盖特征提取、池化与分类过程，应用于图像识别、语义分割与计算机视觉。',
  },
];

interface BlogPostMeta {
  title: string;
  permalink: string;
  date: string;
  image: string;
  tags: { label: string; permalink: string }[];
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function StatsSection({ postCount }: { postCount: number }) {
  const stats = [
    { value: `${postCount}+`, label: '精读论文与学习笔记' },
    { value: '4', label: '核心研究方向' },
    { value: '2023', label: '小组成立于桂林' },
    { value: '∞', label: '我们探索的脚步' },
  ];
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, color, image, imageAlt }: (typeof features)[0]) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureImageWrap}>
        <img className={styles.featureImage} src={image} alt={imageAlt} loading="lazy" />
        <div
          className={styles.featureIcon}
          style={{ color, borderColor: `${color}44`, background: `${color}14` }}>
          {icon}
        </div>
      </div>
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
      <div className={styles.featureAccent} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  );
}

function CtaBanner() {
  return (
    <section className={styles.ctaBanner}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2>用简单的努力，积累不平凡的价值</h2>
        <p>我们边读论文边做笔记，把复杂的内容讲明白。欢迎加入我们一起学习、一起写作、一起进步。</p>
        <div className={styles.ctaButtons}>
          <Link className={styles.ctaButtonPrimary} to="/blog">
            阅读学习日志
          </Link>
          <Link className={styles.ctaButtonSecondary} href="https://github.com/FEMATHS">
            GitHub 关注我们
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  const { siteConfig = {} } = useDocusaurusContext();

  // 本地插件 blog-global-data 在构建时注入的博客文章数据
  const blogPosts: BlogPostMeta[] =
    (useGlobalData() as any)?.['blog-global-data']?.default?.blogPosts ?? [];
  const postCount = blogPosts.length || 30;
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <Layout title={`欢迎来到 ${siteConfig.title}`} description="FEMATHS 小组：计算数学 × 机器学习，论文精读、Wiki 知识库与学习日志">
      <header className={styles.heroBanner}>
        <HeroParticles />
        <div className={clsx('container', styles.heroInner)}>
          <div className={styles.heroBadge}>📐 计算数学 × 机器学习</div>
          <h1 className={styles.heroTitle}>
            机器学习
            <span className={styles.heroTitleGradient}>小纵队</span>
          </h1>
          <p className={styles.heroTagline}>{siteConfig.tagline}</p>
          <p className={styles.heroSubtitle}>
            一群热爱数学的年轻人，一起精读论文、构建 Wiki、记录成长。
            <br />
            从 PINN 到谱方法，从优化到深度学习——我们相信，用简单的努力，积累不平凡的价值。
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.heroButtonPrimary} to="/docs/ch0/FEMATHS-wiki-introduction">
              进入 Wiki 知识库 →
            </Link>
            <Link className={styles.heroButtonGhost} to="/blog">
              阅读学习日志
            </Link>
          </div>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,64 C360,120 720,0 1080,48 C1260,72 1380,64 1440,56 L1440,120 L0,120 Z"
              fill="var(--ifm-background-color)"
            />
          </svg>
        </div>
      </header>

      <main>
        <StatsSection postCount={postCount} />

        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>我们研究什么</h2>
              <p>围绕计算数学与机器学习，四个核心方向并行推进</p>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        {latestPosts.length > 0 && (
          <section className={styles.postsSection}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>最新学习日志</h2>
                <p>边读论文边做笔记，用朴素的写作把复杂的思想讲明白</p>
              </div>
              <div className={styles.postsGrid}>
                {latestPosts.map((post) => (
                  <Link key={post.permalink} to={post.permalink} className={styles.postCard}>
                    <div className={styles.postImageWrap}>
                      <img className={styles.postImage} src={post.image} alt="" loading="lazy" />
                    </div>
                    <div className={styles.postContent}>
                      <div className={styles.postDate}>{formatDate(post.date)}</div>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      <div className={styles.postTags}>
                        {post.tags.slice(0, 2).map((t) => (
                          <span key={t.permalink || t.label} className={styles.postTag}>
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.viewAll}>
                <Link to="/blog" className={styles.viewAllLink}>
                  查看全部日志 →
                </Link>
              </div>
            </div>
          </section>
        )}

        <CtaBanner />

        <IndexComment />
      </main>
    </Layout>
  );
}
