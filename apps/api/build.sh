#!/usr/bin/env bash

# Generate the pruned monorepo
# This till be easier once turborepo adds an ignore feature option
# Running --out-dir apps/api/out it will cause an infinite loop
turbo prune @kaizen/api --out-dir temp --docker;
mkdir -p out;
cp -R ../../temp/* out;
rm -rf ../../temp;

# Build the application
cd out/full;
npm run build;