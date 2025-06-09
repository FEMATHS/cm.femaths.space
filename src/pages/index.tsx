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
    title: '算法部',
    imageUrl: 'img/1.png',
    description: (
      <>
        本部门以培养优秀的算法工程师为目标。夯实算法基础和领会并能灵活运用编程思想。
        提升算法优化能力、逻辑思维能力和抽象建模能力，为今后的参与算法比赛和就业做准备。
      </>
    ),
    caption: '培养未来算法专家',
  },
  {
    title: '大数据技术与分析部',
    imageUrl: 'img/2.png',
    description: (
      <>
        本部门以培养优秀的数据研发工程师为目标。打好扎实的数理统计基础，掌握数据挖掘的
        基础理论、核心算法、关键技术及软件系统，熟悉海量复杂数据的组织、处理、分析、挖掘和可视化等问题。
      </>
    ),
    caption: '数据驱动未来',
  },
  {
    title: '信息安全部',
    imageUrl: 'img/3.png',
    description: (
      <>
        本部门研究范围较广，主要涉及木马编程、网络渗透、逆向工程、代码审计、
        密码学及社会工程学等方向。成员通过组队参加各大 CTF 及信息安全比赛。
      </>
    ),
    caption: '守护网络安全',
  },
  {
    title: '应用软件研发部',
    imageUrl: 'img/4.png',
    description: (
      <>
        本部门以培养计算机技术领域优秀的工程师为目标，学习方向广泛，
        包括 Web 开发、移动端开发、DevOps、云计算与云原生等。
      </>
    ),
    caption: '打造实用软件产品',
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
        <div className="container">
          <img
            style={{ display: 'block', margin: '0 auto' }}
            src={useBaseUrl('https://github.com/FEMATHS/photo/blob/main/biglogo.JPG?raw=true')}
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
            <div className={classnames('container', styles.featuresContainer)}>
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
