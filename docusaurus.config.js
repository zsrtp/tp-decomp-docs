// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const REPO_URL = 'https://github.com/zsrtp';
const DISCORD_URL = 'https://discord.zelda.deco.mp';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Twilight Princess Speedruns',
  tagline: 'A hub for the Twilight Princess Speedrunning community',
  url: 'https://zsrtp.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  baseUrlIssueBanner: false,

  plugins: [require.resolve('@cmfcmf/docusaurus-search-local')],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ZSR Twilight Princess',
        logo: {
          alt: 'ZSR Twilight Princess',
          src: 'img/logo.png',
          height: 32,
          width: 32,
        },
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Decomp',
            items: [
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Progress',
                to: '/progress',
              },
              {
                label: 'Contribute',
                href: '/contribute',
              },
              {
                label: 'GitHub',
                href: 'https://www.github.com/zeldaret/tp',
              },
              {
                label: 'Discord',
                href: DISCORD_URL,
              },
            ],
          },
          {
            href: 'https://tpgz.io/',
            label: 'Practice Rom',
            position: 'left',
          },
          {
            href: 'https://tprandomizer.com/',
            label: 'Randomizer',
            position: 'left',
          },
          {
            href: 'https://zeldaspeedruns.com/tp',
            label: 'ZeldaSpeedRuns',
            position: 'left',
          },
          {
            href: REPO_URL,
            label: 'ZSRTP GitHub',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
              { label: 'Speedrun Discord', href: 'https://discord.gg/tp' },
              { label: 'Dev Discord', href: 'https://discord.gg/aZx8ZFcSPy' },
              { label: 'Website GitHub', href: 'https://github.com/zsrtp/tp-decomp-docs' },
        ],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      prism: {
        darkTheme: darkCodeTheme,
        defaultLanguage: 'cpp',
      },
    }),
};

module.exports = config;
