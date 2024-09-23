# Use an official Node.js runtime as a base image
FROM node:20.9.0-alpine AS base
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set npm to a specific version
RUN npm install -g npm@10.2.2

# Set working directory
WORKDIR /app
RUN npm install -g turbo@1.13.4
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune @kaizen/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

# Build the project
COPY --from=builder /app/out/full/ .
COPY tsconfig.base.json .
RUN npm ci
RUN npx turbo run build --filter=@kaizen/api

FROM base AS runner
WORKDIR /app

# Copy the built files and install production dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/out/full/apps/api/src/prisma ./apps/api/src/prisma
COPY --from=installer /app/dist/ .
RUN npm ci --omit=dev
RUN npx prisma generate

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

CMD ["node", "apps/api/src/server.js"]
