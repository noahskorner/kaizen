module.exports = {
  $schema: "https://json.schemastore.org/tsconfig",
  display: "React",
  extends: "./base.json",
  compilerOptions: {
    jsx: "react-jsx",
    lib: ["ES2015", "DOM"],
    module: "ESNext",
    target: "es6",
  },
};
