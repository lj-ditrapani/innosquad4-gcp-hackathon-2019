### Base Node and config
FROM node:10.16.0-stretch-slim AS base
MAINTAINER Soctiabank-InnoSquad4
COPY package.json package-lock.json ./


### format check
FROM base AS formatter
RUN mkdir frontend
COPY frontend/package.json frontend/package-lock.json frontend/
RUN npm --prefix frontend install
RUN npm install
COPY frontend/.prettierrc.json frontend/
COPY frontend/public frontend/public/
RUN npm --prefix frontend run fmt-check
COPY .prettierrc.json ./
COPY src src/
RUN npm run fmt-check


### Release
FROM base as release
RUN npm install --only prod
COPY frontend/public/ frontend/public/
COPY src src/
EXPOSE 3000
CMD [ "npm", "start"]
