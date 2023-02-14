import { getTokens, getTokensObject } from './tokensUtils'

export const baseTokens = {
  BASE_COLOR: {
    PRIMARY: {
      LIGHT: '#c0b7f3',
      MAIN: '#998ceb',
      DARK: '#5f4be0',
    },
    GRAY: {
      WHITE: '#ffffff',
      50: '#808080',
      BLACK: '#000000',
    },
  },
  COLOR: {
    TEXT: {
      PRIMARY: {
        THEME_LIGHT: '#1a1a1a',
        THEME_DARK: '#ffffff',
        THEME_FANTASY: '#ffff00',
        INVERTED: {
          THEME_LIGHT: '#ffffff',
          THEME_DARK: '#1a1a1a',
          THEME_FANTASY: '#ff0000',
        },
      },
      DIM: {
        DEFAULT: '#808080',
        THEME_FANTASY: '#00ff00',
      },
    },
  },
}

const tokensObject = {
  root: {
    '--base-color--primary--light': '#c0b7f3',
    '--base-color--primary--main': '#998ceb',
    '--base-color--primary--dark': '#5f4be0',
    '--base-color--gray--50': '#808080',
    '--base-color--gray--white': '#ffffff',
    '--base-color--gray--black': '#000000',
  },
  theme_light: {
    '--color--text--primary': '#1a1a1a',
    '--color--text--primary--inverted': '#ffffff',
    '--color--text--dim': '#808080',
  },
  theme_dark: {
    '--color--text--primary': '#ffffff',
    '--color--text--primary--inverted': '#1a1a1a',
    '--color--text--dim': '#808080',
  },
  theme_fantasy: {
    '--color--text--primary': '#ffff00',
    '--color--text--primary--inverted': '#ff0000',
    '--color--text--dim': '#00ff00',
  },
}

const THEMES = {
  THEME_LIGHT: 'theme_light',
  THEME_DARK: 'theme_dark',
  THEME_FANTASY: 'theme_fantasy',
}

test('get tokens object', () => {
  const tokens = getTokensObject(baseTokens, THEMES)
  expect(tokens).toEqual(tokensObject)
})

test('get stringified tokens', () => {
  const tokens = getTokens({ baseTokens, themes: THEMES })
  const expectedRootSelector = ':root'
  const expectedRootValue =
    '--base-color--primary--light: #c0b7f3; --base-color--primary--main: #998ceb; --base-color--primary--dark: #5f4be0; --base-color--gray--50: #808080; --base-color--gray--white: #ffffff; --base-color--gray--black: #000000'
  const expectedThemeLightSelector = 'body[data-theme="theme_light"]'
  const expectedThemeLightValue =
    '--color--text--primary: #1a1a1a; --color--text--primary--inverted: #ffffff; --color--text--dim: #808080'
  const expectedThemeDarkSelector = 'body[data-theme="theme_dark"]'
  const expectedThemeDarkValue =
    '--color--text--primary: #ffffff; --color--text--primary--inverted: #1a1a1a; --color--text--dim: #808080'
  const expectedThemeFantasySelector = 'body[data-theme="theme_fantasy"]'
  const expectedThemeFantasyValue =
    '--color--text--primary: #ffff00; --color--text--primary--inverted: #ff0000; --color--text--dim: #00ff00'

  expect(tokens).toContain(expectedRootSelector)
  expect(tokens).toContain(expectedRootValue)
  expect(tokens).toContain(expectedThemeLightSelector)
  expect(tokens).toContain(expectedThemeLightValue)
  expect(tokens).toContain(expectedThemeDarkSelector)
  expect(tokens).toContain(expectedThemeDarkValue)
  expect(tokens).toContain(expectedThemeFantasySelector)
  expect(tokens).toContain(expectedThemeFantasyValue)
})
