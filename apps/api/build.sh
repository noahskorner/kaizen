#!/usr/bin/env bash

# Generate the pruned monorepo
turbo prune @kaizen/api --out-dir temp;
mkdir -p out;
cp -R ../../temp/* out;
rm -rf ../../temp;

# Build the application
cd out;
npm run build;

# # Copy the package*.json files to the dist folder
cp package.json dist;
cp package-lock.json dist;
find ./apps ./packages -name package.json -exec bash -c 'mkdir -p "dist/$(dirname {})" && cp "{}" "dist/{}"' \;