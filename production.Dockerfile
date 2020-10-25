FROM ghcr.io/dormlife-softeng/backend-baseimage:0.3.6-dev as development

ENV NODE_ENV=development

WORKDIR /usr/src/app

# Copy source code
COPY ./src ./src

# Compile code
RUN npm run build

FROM node:14-alpine3.11 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json ./

RUN npm install --only=production

# Copy only compiled source code.
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

