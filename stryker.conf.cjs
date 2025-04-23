// stryker.conf.cjs
/** @type {import('@stryker-mutator/core').PartialStrykerOptions} */
module.exports = {
  $schema: "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  mutator: {
    plugins: ["@stryker-mutator/vue-mutator"]
  },
  checkers: ["typescript"],
  plugins: ["@stryker-mutator/typescript-checker", "@stryker-mutator/*"],
  testRunner: "vitest",
  reporters: ["html", "clear-text", "progress"],
  coverageAnalysis: "off",
  tsconfigFile: "tsconfig.json",
  mutate: ["src/**/*.ts", "src/**/*.vue"],
  htmlReporter: {
    fileName: "mutation-reports/index.html"
  }
};
