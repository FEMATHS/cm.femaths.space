const fs = require('fs')
const path = require('path')

// 中文标题映射
const indexData = {
  ch0: '首页',
  ch1: '第零章：在开始之前',
  ch2: '第一章上：HelloWorld',
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

  let introDocId = null // 👉 用于注册 /docs/intro

  for (const [folder, label] of Object.entries(indexData)) {
    const files = getDocsInFolder(folder)
    if (files.length === 0) continue

    const intro = files[0]
    const others = files.slice(1)

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

      if (!introDocId) {
        introDocId = `${folder}/${intro.id}`
      }
    }

    sidebar.push(category)
  }

  if (!introDocId) {
    throw new Error(
      '❌ 未找到任何首页文档作为默认入口，请检查 docs 目录及文件命名'
    )
  }

  sidebar.unshift({
    type: 'doc',
    id: introDocId,
    label: '📘 主页',
  })

  console.log('生成的 sidebar:', JSON.stringify(sidebar, null, 2)) // 打印调试

  return sidebar
}

module.exports = generateSidebar
