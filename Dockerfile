FROM node:slim AS base

RUN apt-get update && \
    apt-get install -y python3 make g++ procps &&  \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM base AS development

CMD ["npm", "run", "start:dev"]

FROM base AS production

ENV NODE_ENV production

COPY --from=development /usr/src/app/dist ./dist

RUN npm prune --production

CMD ["node", "dist/main"]

EXPOSE 3000