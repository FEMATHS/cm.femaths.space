import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';
import PromotionalVideo from './PromotionalVideo';
import IndexComment from './IndexComment';

const features = [
  {
    title: '数值分析',
    imageUrl: 'img/1.png', // 替换为你的 PDE 可视化图像路径
    description: (
      <>
        研究偏微分方程（PDE）的数值解法，如有限差分法、有限元法和谱方法。
        应用于热传导、波动传播与流体模拟等科学计算场景中。
      </>
    ),
    caption: '网格上的波动演化、热传导或流体模拟',
  },
  {
    title: '优化算法',
    imageUrl: 'img/2.png', // 替换为目标函数图像路径
    description: (
      <>
        探索凸优化与非凸优化中的经典方法，如梯度下降、牛顿法和约束优化。
        聚焦在等高线分析和最优解轨迹的可视化上。
      </>
    ),
    caption: '凸优化目标面、等高线与最优点轨迹',
  },
  {
    title: 'PINN（物理信息神经网络）',
    imageUrl: 'img/3.png', // 替换为PINN架构图像路径
    description: (
      <>
        结合神经网络与物理模型，引入PDE约束、残差分析和自适应采样机制。
        广泛用于模拟自然过程与解决逆问题。
      </>
    ),
    caption: 'PINN架构+残差图+物理约束可视化',
  },
  {
    title: '深度学习',
    imageUrl: 'img/4.png', // 替换为CNN结构图像路径
    description: (
      <>
        聚焦于卷积神经网络（CNN）的结构与原理，涵盖特征提取、池化与分类过程。
        广泛应用于图像识别、语义分割与计算机视觉任务中。
      </>
    ),
    caption: '多层卷积神经网络结构图',
  },
];


function Feature({ imageUrl, title, description, caption }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.imageWrapper}>
        <img className={styles.featureImage} src={useBaseUrl(imageUrl)} alt={title} />
        {caption && <div className={styles.imageCaption}>{caption}</div>}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout
      title={`欢迎来到 ${siteConfig.title}`}
      description="这里是主页简介，将出现在 <head /> 的 meta 中">
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container" style={{ paddingBottom: '20px' }}>
          <img
            style={{ display: 'block', margin: '0 auto' ,paddingBottom: '25px' }}
            src={useBaseUrl('img/biglogo.jpg')}
            alt="Logo"
          />
          <div className={styles.buttons}>
            <Link
              className={classnames('button button--outline button--secondary button--lg', styles.getStarted)}
              to="docs/intro" // ✅ 设置真实跳转链接
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      
      
      <main>
        {features.length > 0 && (
          <section className={styles.features}>
            <div className={classnames('container1', styles.featuresContainer)}>
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className={classnames(styles.announcement, styles.announcementDark)}>
          <div className={styles.announcementInner}>
            了解更多，敬请关注 🔗
          </div>
        </div>

        <PromotionalVideo />
        <IndexComment />
      </main>
    </Layout>
  );
}
