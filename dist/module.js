import {jsx as $5OpyM$jsx} from "react/jsx-runtime";
import {createContext as $5OpyM$createContext, useState as $5OpyM$useState, useEffect as $5OpyM$useEffect} from "react";



const $fc5155f00aaa1e77$export$2c657da244d00bd6 = /*#__PURE__*/ (0, $5OpyM$createContext)();
const $fc5155f00aaa1e77$var$defaultTheme = "tlight";
function $fc5155f00aaa1e77$export$d8964aec282183a3(props) {
    const [theme, setTheme] = (0, $5OpyM$useState)();
    (0, $5OpyM$useEffect)(()=>{
        const localStorageTheme = window.localStorage.getItem("theme") || undefined;
        const defaultUserThemeIsDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
        if (localStorageTheme) setTheme(localStorageTheme);
        else if (defaultUserThemeIsDark) setTheme("tdark");
        else setTheme($fc5155f00aaa1e77$var$defaultTheme);
    }, []);
    (0, $5OpyM$useEffect)(()=>{
        if (theme) {
            document.body.dataset.theme = theme;
            window.localStorage.setItem("theme", theme);
        }
    }, [
        theme
    ]);
    const value = {
        theme: theme,
        setTheme: setTheme
    };
    return /*#__PURE__*/ (0, $5OpyM$jsx)($fc5155f00aaa1e77$export$2c657da244d00bd6.Provider, {
        value: value,
        ...props
    });
}


const $d96ba759b0efc9f6$var$SEPARATOR = "--";
function $d96ba759b0efc9f6$var$isObject(obj) {
    return !!(typeof obj === "object");
}
function $d96ba759b0efc9f6$var$transformTokensToString(tokensObject) {
    return Object.entries(tokensObject).map(([key, value])=>`${key}: ${value}`).join("; ");
}
function $d96ba759b0efc9f6$var$createTokensObjects(prefix, tokens, themesTokens, themes) {
    for(const key in tokens){
        const newPrefix = prefix + $d96ba759b0efc9f6$var$SEPARATOR + key.replace("_", "-").toLowerCase();
        if ($d96ba759b0efc9f6$var$isObject(tokens[key])) $d96ba759b0efc9f6$var$createTokensObjects(newPrefix, tokens[key], themesTokens, themes);
        else {
            const themesKeys = Object.keys(themes);
            if (themesKeys.includes(key)) themesTokens[`${key.toLowerCase()}`][prefix] = tokens[key];
            else if (key === "DEFAULT") themesKeys.forEach((KEY)=>{
                themesTokens[`${KEY.toLowerCase()}`][prefix] = tokens["DEFAULT"];
            });
            else themesTokens.root[newPrefix] = tokens[key];
        }
    }
}
function $d96ba759b0efc9f6$export$d83ed33dd9655c7e(baseTokens, themes, prefix) {
    //  The tokens will be saved here, separated in objects:
    //    - root: where lives tokens without theme
    //    - [theme]: where lives tokens with theme, one object per theme
    let tokens = {
        root: {}
    };
    // We create the theme tokens object
    for(const theme in themes)tokens[`${themes[theme]}`] = {};
    $d96ba759b0efc9f6$var$createTokensObjects(prefix, baseTokens, tokens, themes);
    return tokens;
}
function $d96ba759b0efc9f6$export$13b34cd061e79947(tokens) {
    let allThemesTokens = "";
    for(const themeKey in tokens)if (themeKey === "root") // The root tokens will be attached to the :root
    allThemesTokens += `
        :root {
          ${$d96ba759b0efc9f6$var$transformTokensToString(tokens.root)}
        }
    `;
    else // For each theme we will create a data-theme property
    // in the body were the tokens will be attackeds
    allThemesTokens += `
        body[data-theme="${themeKey}"] {
          ${$d96ba759b0efc9f6$var$transformTokensToString(tokens[themeKey])}
        }
      `;
    return allThemesTokens;
}
function $d96ba759b0efc9f6$export$f901672b588105c0({ baseTokens: baseTokens , themes: themes , prefix: prefix  }) {
    const tokens = $d96ba759b0efc9f6$export$d83ed33dd9655c7e(baseTokens, themes, prefix);
    return $d96ba759b0efc9f6$export$13b34cd061e79947(tokens);
}




export {$fc5155f00aaa1e77$export$d8964aec282183a3 as ThemeProvider, $fc5155f00aaa1e77$export$2c657da244d00bd6 as ThemeContext, $d96ba759b0efc9f6$export$f901672b588105c0 as getTokens};
//# sourceMappingURL=module.js.map
