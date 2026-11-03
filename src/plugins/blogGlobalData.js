/**
 * 本地插件:在构建时读取 blog/ 目录的文章 frontmatter,
 * 通过 setGlobalData 注入站点全局数据,供首页渲染最新日志。
 *
 * (Docusaurus 3.10 的官方博客插件不再提供 globalData,故自行解析。
 *  permalink 规则与默认博客插件一致:/blog/<去掉 .md 的文件名>。)
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.resolve(__dirname, '../../blog');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  return fm;
}

function parseTags(rawTags) {
  if (!rawTags) return [];
  const inner = rawTags.replace(/^\[/, '').replace(/\]$/, '');
  return inner
    .split(/[,，]/)
    .map((t) => t.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean)
    .slice(0, 3)
    .map((label) => ({ label }));
}

function findFirstImage(raw) {
  const imagePattern =
    /!\[[^\]]*\]\((?:<)?([^\s)>]+)(?:>)?(?:\s+["'][^)]*["'])?\)|<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  const match = imagePattern.exec(raw);
  return match?.[1] || match?.[2] || null;
}

function getImageDataUrl(image, markdownPath) {
  if (/^(?:https?:\/\/|\/\/|data:|\/)/i.test(image)) return image;

  const imagePath = path.resolve(path.dirname(markdownPath), decodeURIComponent(image));
  const relativePath = path.relative(BLOG_DIR, imagePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Blog cover image must be inside the blog directory: ${image}`);
  }
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Blog cover image not found: ${imagePath}`);
  }

  const mimeTypes = {
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  };
  const mimeType = mimeTypes[path.extname(imagePath).toLowerCase()];
  if (!mimeType) {
    throw new Error(`Unsupported blog cover image type: ${imagePath}`);
  }

  return `data:${mimeType};base64,${fs.readFileSync(imagePath).toString('base64')}`;
}

module.exports = function blogGlobalDataPlugin() {
  return {
    name: 'blog-global-data',
    async loadContent() {
      const files = fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith('.md') && !f.startsWith('_'));
      const posts = [];
      for (const file of files) {
        const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
        const fm = parseFrontmatter(content);
        if (/^true$/i.test(fm.draft || '')) continue;
        const title = (fm.title || file).replace(/^["']|["']$/g, '');
        posts.push({
          title,
          date: fm.date || null,
          permalink: `/blog/${file.replace(/\.md$/, '')}`,
          image: '/img/biglogo.jpg',
          imageSource: findFirstImage(content),
          sourceFile: path.join(BLOG_DIR, file),
          tags: parseTags(fm.tags),
        });
      }
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      for (const post of posts.slice(0, 3)) {
        post.image = post.imageSource
          ? getImageDataUrl(post.imageSource, post.sourceFile)
          : '/img/biglogo.jpg';
      }

      return {
        posts: posts.map(({ imageSource, sourceFile, ...post }) => post),
      };
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData({ blogPosts: content.posts });
    },
  };
};
