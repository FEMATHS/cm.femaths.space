const fs = require('fs')
const path = require('path')

// 中文标题映射
const indexData = {
  ch0: '首页',
  ch1: '第零章：在开始之前',
  ch2: '第一章上：HelloWorld',
}

function getDocsInFolder(folder) {
  const folderPath = path.join(__dirname, '..', 'docs', folder) // 注意这里 ../
  if (!fs.existsSync(folderPath)) return []

  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => ({
      file,
      id: path.basename(file, path.extname(file)),
    }))
    .sort((a, b) => a.file.localeCompare(b.file))
}

function generateSidebar() {
  const sidebar = []

  for (const [folder, label] of Object.entries(indexData)) {
    const files = getDocsInFolder(folder)
    if (files.length === 0) continue

    const intro = files.find((f) => f.file.startsWith('[0]'))
    const others = files.filter((f) => f !== intro)

    const category = {
      type: 'category',
      label,
      items: others.map((f) => `${folder}/${f.id}`),
    }

    if (intro) {
      category.link = {
        type: 'doc',
        id: `${folder}/${intro.id}`,
      }
    }

    sidebar.push(category)
  }

  if (sidebar.length === 0) {
    throw new Error('❌ tutorialSidebar 是空的，请添加有效文档')
  }

  return sidebar
}

module.exports = generateSidebar
