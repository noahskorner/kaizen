# Kaizen

## Prerequisites
- Volta

## Getting Started
- Clone the repository
- `npm install`
- `npm run dev`

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
  extends: [require.resolve('@kaizen/config/eslint/[CONFIG_VERSION].json')]
};
```

**`tsconfig.json`**
```json
{
  "extends": "@kaizen/config/typescript/[CONFIG_VERSION].json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```
