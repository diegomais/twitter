# Install dependencies only when needed
FROM node:lts-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm install --location=global @nestjs/cli
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN npm run build && npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run
FROM node:lts-alpine AS production
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3333

CMD [ "node", "dist/main"]