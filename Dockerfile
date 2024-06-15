FROM node:20-alpine as build

RUN npm install pnpm -g

RUN mkdir /app && \
    chown -R node:node /app

USER node

WORKDIR /app

ADD package.json .
ADD pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

ADD src ./src
ADD tsconfig.json .
ADD ecosystem.config.js .

RUN pnpm run build

FROM node:20-alpine

RUN mkdir /app && \
    chown -R node:node /app

RUN npm install pm2 -g

USER node
WORKDIR /app

COPY --from=build /app/out ./out/
COPY --from=build /app/node_modules ./node_modules/
COPY --from=build /app/ecosystem.config.js ./ecosystem.config.js

CMD ["pm2-runtime", "ecosystem.config.js"]