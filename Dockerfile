FROM node:slim AS base

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