const SEPARATOR = '--'

function isObject(obj) {
  return !!(typeof obj === 'object')
}

function transformTokensToString(tokensObject) {
  return Object.entries(tokensObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}

function createTokensObjects(prefix, tokens, themesTokens, themes) {
  for (const key in tokens) {
    const newPrefix = prefix + SEPARATOR + key.replace('_', '-').toLowerCase()
    if (isObject(tokens[key])) {
      createTokensObjects(newPrefix, tokens[key], themesTokens, themes)
    } else {
      const themesKeys = Object.keys(themes)

      if (themesKeys.includes(key)) {
        themesTokens[`${key.toLowerCase()}`][prefix] = tokens[key]
      } else if (key === 'DEFAULT') {
        themesKeys.forEach((KEY) => {
          themesTokens[`${KEY.toLowerCase()}`][prefix] = tokens.DEFAULT
        })
      } else {
        themesTokens.root[newPrefix] = tokens[key]
      }
    }
  }
}

export function getTokensObject(baseTokens, themes, prefix = '') {
  //  The tokens will be saved here, separated in objects:
  //    - root: where lives tokens without theme
  //    - [theme]: where lives tokens with theme, one object per theme
  const tokens = {
    root: {},
  }

  // We create the theme tokens object
  for (const theme in themes) {
    tokens[`${themes[theme]}`] = {}
  }

  createTokensObjects(prefix, baseTokens, tokens, themes)

  return tokens
}

export function getTokensString(tokens) {
  let allThemesTokens = ''

  for (const themeKey in tokens) {
    if (themeKey === 'root') {
      // The root tokens will be attached to the :root
      allThemesTokens += `
        :root {
          ${transformTokensToString(tokens.root)}
        }
    `
    } else {
      // For each theme we will create a data-theme property
      // in the body were the tokens will be attackeds
      allThemesTokens += `
        body[data-theme="${themeKey}"] {
          ${transformTokensToString(tokens[themeKey])}
        }
      `
    }
  }

  return allThemesTokens
}

export function getTokens({ baseTokens, themes, prefix = '' }) {
  const tokens = getTokensObject(baseTokens, themes, prefix)

  return getTokensString(tokens)
}
