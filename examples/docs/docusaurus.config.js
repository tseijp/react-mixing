/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'react-mixing',
  tagline: 'react-mixing are cool',
  url: 'https://rmix.tsei.jp',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: 'react mixing 🤞',
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Docs'},
        {to: '/examples/intro', label: 'Examples', position: 'left'},
        {
          href: 'https://github.com/tseijp/react-mixing',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Pages',
          items: [
            {label: 'Docs', to: '/docs/intro'},
            {label: 'Examples', to: '/examples/intro'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/react-mixing'},
            {label: 'Twitter', href: 'https://twitter.com/tseijp'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/tseijp/react-mixing'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tseijp/react-mixing/edit/master/examples/',
        }
      },
    ],
  ],
};
