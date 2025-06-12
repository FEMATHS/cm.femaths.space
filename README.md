> 国内 GitHub 访问缓慢问题解决方案：https://github.com/521xueweihan/GitHub520

# 简介

这里是桂林电子科技大学数学与计算科学学院计算数学学习小组 FEMATHS 的学习笔记网站。站点基于 Facebook 开源站点生成器 [Docusaurus](https://github.com/facebook/docusaurus) 构建，当前使用版本：[2.4.0](https://docusaurus.io/)。项目使用 [GitHub Action](https://github.com/FEMATHS/cm.fesmpn.space/actions) 进行 CI/CD。

项目的 GitHub Actions 简介 - [github action)](https://docs.github.com/zh/actions)

# 参与站点的维护

加入站点的维护并无任何门槛，你只需要懂那么一点点的 Git 操作「即可参与站点文档部分的维护」，还不熟悉 Git 协作的同学可以先看看这个教程-> [Git 教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)，由于实验楼已经寄了目前也没有比较适合的实操网站。

加入站点的开发还是微微有点门槛的，熟悉 Web 前端（特别是熟悉 [React](https://zh-hans.reactjs.org/)）的同学，读个文档就能快速上手，对站点进行定制开发。具体可以参考 Docusaurus@v2 官方文档 -> [🔗docusaurus🌹](https://docusaurus.io/docs)。

## 开发环境说明

请使用 npm 包管理工具进行本地开发。

[Node.js](http://nodejs.cn/) 版本 >= 18.

npm 不需要额外安装，安装 node.js 已经自带 npm.

## 参与贡献

首先学习 FEMATHS 学习小组日志中的[如何正确对待论文]，能阅读论文之后可以进行学习笔记上传。

- Step 1：[fork「戳我」](https://github.com/FEMATHS/cm.fesmpn.space/fork) 本仓库，clone 项目到本地进行开发。

```bash
git clone https://github.com/your-username/cm.femaths.space
cd cm.femaths.space
```

- Step 2：新建 Git 分支，基于新分支进行开发

```bash
git branch branch-name
```

安装项目依赖

```bash
npm install
```

- Step 3：启动开发服务器，进行开发

```bash
npm run start
```

- Step 4：将变更提交至 GitHub，然后向本仓库（main branch）发起 pull reqeust

```bash
git add .
git commit -m "feat: xxxxxx"
git push origin branch-name
```

## 工具 🔨

在使用本网站的时候也许开发者需要用到的一些网站以及一些工具，比如

#### 图床

- [聚合图床](https://www.superbed.cn/)

※ 目前还在正常运行 ing。

#### 编辑器

- [Visual Studio Code](https://code.visualstudio.com/)

## 目前参与奉献

[![All Contributors](https://img.shields.io/github/all-contributors/FEMATHS/cm.femaths.space?color=ee8449&style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/redhat123456"><img src="https://avatars.githubusercontent.com/u/57751257?v=4?s=100" width="100px;" alt="_Tanger_"/><br /><sub><b>_Tanger_</b></sub></a><br /><a href="#doc-redhat123456" title="Documentation">📖</a> <a href="#code-redhat123456" title="Code">💻</a> <a href="#bug-redhat123456" title="Bug reports">🐛</a> <a href="#design-redhat123456" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zqqqqqqj1110"><img src="https://avatars.githubusercontent.com/u/95482898?v=4?s=100" width="100px;" alt="羊村的风吹不到比奇堡，我和她也没有明天"/><br /><sub><b>羊村的风吹不到比奇堡，我和她也没有明天</b></sub></a><br /><a href="#doc-zqqqqqqj1110" title="Documentation">📖</a> <a href="#code-zqqqqqqj1110" title="Code">💻</a> <a href="#bug-zqqqqqqj1110" title="Bug reports">🐛</a> <a href="#design-zqqqqqqj1110" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
