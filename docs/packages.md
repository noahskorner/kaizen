# Packages

## Adding a new package

```bash
cd packages
mkdir [PACKAGE_NAME]
npm init
touch eslintrc.js
touch tsconfig.json
```

**`eslintrc.js`**

```js
module.exports = {
  extends: [require.resolve('../../../eslintrc.{base,react}.json')]
};
```

**`tsconfig.json`**

```json
{
  "extends": "../../../tsconfig.{base, react, vite, vite.node}.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```
