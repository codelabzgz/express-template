# syntax=docker.io/docker/dockerfile:1

# 1. Base image for Node.js 22
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts=true

# 2. Build stage
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm ci --ignore-scripts=true && npm run-script build

# 3. Production-ready image
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs \
  && adduser -S express -u 1001 \
  && apk add --no-cache tini

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN chown -R express:nodejs /app
USER express
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "app/dist/api/server.js"]
