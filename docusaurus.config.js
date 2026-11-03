// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const math = require('remark-math').default
const katex = require('rehype-katex').default
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '机器学习小纵队',
  tagline: 'FEMATHS · 用简单的努力，积累不平凡的价值',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://cm.femaths.space',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FEMATHS', // Usually your GitHub org/user name.
  projectName: 'cm.femaths.space', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: 'https://github.com/FEMATHS/cm.femaths.space/tree/main/',
        },
        blog: {
          postsPerPage: 'ALL',
          showReadingTime: true,
          blogTitle: 'FEMATHS小组学习日志',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          editUrl: 'https://github.com/FEMATHS/cm.femaths.space/tree/main/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [require.resolve('./src/plugins/blogGlobalData.js')],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/biglogo.jpg',
      navbar: {
        title: '机器学习小纵队',
        logo: {
          alt: '机器学习小纵队',
          src: 'img/favicon.ico',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '计算数学以及机器学习Wiki',
          },
          {
            to: '/blog',
            label: 'FEMATHS小组学习日志',
            position: 'left',
          },
          {
            to: '/members',
            label: 'FEMATHS小组成员',
            position: 'left',
          },
          {
            href: 'https://github.com/FEMATHS',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '站内导航',
            items: [
              {
                label: '首页',
                to: '/',
              },
              {
                label: '团队成员',
                to: '/members',
              },
              {
                label: '加入我们',
                href: 'https://github.com/FEMATHS',
              },
            ],
          },
          {
            title: '资源中心',
            items: [
              {
                label: 'Wiki 知识库',
                to: '/docs/ch0/FEMATHS-wiki-introduction',
              },
              {
                label: '论文学习日志',
                to: '/blog',
              },
              {
                label: 'FEMATHS GitHub',
                href: 'https://github.com/FEMATHS',
              },
            ],
          },
          {
            title: '常用链接',
            items: [
              {
                label: '桂林电子科技大学',
                href: 'https://www.guet.edu.cn/',
              },
              {
                label: '桂林电子科技大学数学与计算科学学院',
                href: 'https://www.guet.edu.cn/math/',
              },
            ],
          },
          {
            title: '友情链接',
            items: [
              {
                label: '桂林电子科技大学七院创新基地',
                href: 'https://xn--7gqr3hs9ecxao51c822e.cn/',
              },
              {
                label: '桂林电子科技大学三院科协',
                href: 'https://www.kexie.space/',
              },
              {
                label: '公众号 · 山海数模',
                to: '/',
              },
            ],
          },
        ],
        copyright: `© 2023–${new Date().getFullYear()} FEMATHS 小组`,
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
