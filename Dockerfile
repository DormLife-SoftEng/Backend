FROM node:14-alpine3.11 as development

ENV NODE_ENV=development

WORKDIR /usr/src/app

# Preparing Package
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .
RUN npm run build


FROM node:14-alpine3.11 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# Copy only compiled source code.
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
