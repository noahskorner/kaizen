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

# Copy the prisma files
cp -R ./apps/api/src/prisma/migrations/ ./dist/apps/api/src/prisma;
cp ./apps/api/src/prisma/schema.prisma ./dist/apps/api/src/prisma;
