module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/__tests__/setup/setupEnzyme.js",
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
