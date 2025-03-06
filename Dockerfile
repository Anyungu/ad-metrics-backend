
FROM node:22 AS builder

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG SERVICE
WORKDIR /app/$SERVICE

RUN npm run build --filter=$SERVICE
RUN npm prune --production

# Stage 2: Production Stage
FROM node:22 AS runner

WORKDIR /app

ARG SERVICE

COPY --from=builder /app/$SERVICE/dist ./dist  
COPY --from=builder /app/$SERVICE/package.json ./


ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/main.js"]