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
  extends: ['../config/eslint/[ESLINT_CONFIG].json']
};
```

**`tsconfig.json`**
```json
{
  "extends": "@kaizen/config/typescript/[TYPESCRIPT_CONFIG].json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```
