const generateSidebar = require('./docs/generateSidebar')

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: generateSidebar(),
}

module.exports = sidebars
