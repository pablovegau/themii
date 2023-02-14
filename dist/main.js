var $gXNCa$reactjsxruntime = require("react/jsx-runtime");
var $gXNCa$react = require("react");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "ThemeProvider", () => $19ce6efc91ed4769$export$d8964aec282183a3);
$parcel$export(module.exports, "ThemeContext", () => $19ce6efc91ed4769$export$2c657da244d00bd6);
$parcel$export(module.exports, "getTokens", () => $3b277edd157a2858$export$f901672b588105c0);


const $19ce6efc91ed4769$export$2c657da244d00bd6 = /*#__PURE__*/ (0, $gXNCa$react.createContext)();
const $19ce6efc91ed4769$var$defaultTheme = "tlight";
function $19ce6efc91ed4769$export$d8964aec282183a3(props) {
    const [theme, setTheme] = (0, $gXNCa$react.useState)();
    (0, $gXNCa$react.useEffect)(()=>{
        const localStorageTheme = window.localStorage.getItem("theme") || undefined;
        const defaultUserThemeIsDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
        if (localStorageTheme) setTheme(localStorageTheme);
        else if (defaultUserThemeIsDark) setTheme("tdark");
        else setTheme($19ce6efc91ed4769$var$defaultTheme);
    }, []);
    (0, $gXNCa$react.useEffect)(()=>{
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
    return /*#__PURE__*/ (0, $gXNCa$reactjsxruntime.jsx)($19ce6efc91ed4769$export$2c657da244d00bd6.Provider, {
        value: value,
        ...props
    });
}


const $3b277edd157a2858$var$SEPARATOR = "--";
function $3b277edd157a2858$var$isObject(obj) {
    return !!(typeof obj === "object");
}
function $3b277edd157a2858$var$transformTokensToString(tokensObject) {
    return Object.entries(tokensObject).map(([key, value])=>`${key}: ${value}`).join("; ");
}
function $3b277edd157a2858$var$createTokensObjects(prefix, tokens, themesTokens, themes) {
    for(const key in tokens){
        const newPrefix = prefix + $3b277edd157a2858$var$SEPARATOR + key.replace("_", "-").toLowerCase();
        if ($3b277edd157a2858$var$isObject(tokens[key])) $3b277edd157a2858$var$createTokensObjects(newPrefix, tokens[key], themesTokens, themes);
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
function $3b277edd157a2858$export$d83ed33dd9655c7e(baseTokens, themes, prefix) {
    //  The tokens will be saved here, separated in objects:
    //    - root: where lives tokens without theme
    //    - [theme]: where lives tokens with theme, one object per theme
    let tokens = {
        root: {}
    };
    // We create the theme tokens object
    for(const theme in themes)tokens[`${themes[theme]}`] = {};
    $3b277edd157a2858$var$createTokensObjects(prefix, baseTokens, tokens, themes);
    return tokens;
}
function $3b277edd157a2858$export$13b34cd061e79947(tokens) {
    let allThemesTokens = "";
    for(const themeKey in tokens)if (themeKey === "root") // The root tokens will be attached to the :root
    allThemesTokens += `
        :root {
          ${$3b277edd157a2858$var$transformTokensToString(tokens.root)}
        }
    `;
    else // For each theme we will create a data-theme property
    // in the body were the tokens will be attackeds
    allThemesTokens += `
        body[data-theme="${themeKey}"] {
          ${$3b277edd157a2858$var$transformTokensToString(tokens[themeKey])}
        }
      `;
    return allThemesTokens;
}
function $3b277edd157a2858$export$f901672b588105c0({ baseTokens: baseTokens , themes: themes , prefix: prefix  }) {
    const tokens = $3b277edd157a2858$export$d83ed33dd9655c7e(baseTokens, themes, prefix);
    return $3b277edd157a2858$export$13b34cd061e79947(tokens);
}




//# sourceMappingURL=main.js.map
