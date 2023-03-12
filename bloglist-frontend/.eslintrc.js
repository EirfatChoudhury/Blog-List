module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 8,
        "requireConfigFile": false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
         },
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "impliedStrict": true,
          "classes": true
        }
    },
}