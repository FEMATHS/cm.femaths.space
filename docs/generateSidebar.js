const fs = require('fs')
const path = require('path')

// 中文标题映射
const indexData = {
  ch0: '📕首页',
  ch1: '📗第零章：在开始之前',
  ch2: '📘第一章：Hello，计算数学',
  ch3: '📙第二章：神奇的谱方法',
}

function getDocsInFolder(folder) {
  const folderPath = path.join(__dirname, '..', 'docs', folder)
  if (!fs.existsSync(folderPath)) return []

  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const baseName = path.basename(file, path.extname(file))
      const cleanedId = baseName.replace(/^\d+-/, '') // 去掉数字+连字符前缀
      return {
        file,
        id: cleanedId,
      }
    })
    .sort((a, b) => a.file.localeCompare(b.file))
}

function generateSidebar() {
  const sidebar = []

  for (const [folder, label] of Object.entries(indexData)) {
    const files = getDocsInFolder(folder)
    if (files.length === 0) continue

    const items = files.map((f) => `${folder}/${f.id}`)

    const category = {
      type: 'category',
      label,
      items,
      // link: { type: 'doc', id: `${folder}/${files[0].id}` }, // 👈 不再设置 intro
    }

    sidebar.push(category)
  }

  return sidebar
}

module.exports = generateSidebar
