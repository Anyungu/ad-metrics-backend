
FROM node:22 AS builder

WORKDIR /app

ENV NODE_ENV=development

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --no-frozen-lockfile

ARG SERVICE

WORKDIR /app/$SERVICE

COPY $SERVICE/package.json ./
RUN corepack enable && pnpm install --no-frozen-lockfile

COPY $SERVICE/ .

RUN pnpm build

RUN pnpm prune --prod

# Stage 2: Production Stage
FROM node:22 AS runner

WORKDIR /app

ARG SERVICE


COPY --from=builder /app/$SERVICE/node_modules ./node_modules
COPY --from=builder /app/$SERVICE/dist ./dist  
COPY --from=builder /app/$SERVICE/package.json ./


ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/main.js"]