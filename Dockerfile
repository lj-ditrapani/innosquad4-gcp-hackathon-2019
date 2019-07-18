### Base Node and config
FROM node:10.16.0-stretch-slim AS base
MAINTAINER Soctiabank-InnoSquad4
RUN mkdir -p backend/public
COPY package.json package-lock.json ./


### format, build
FROM base AS builder
RUN mkdir frontend
COPY frontend/package.json frontend/package-lock.json frontend/
RUN npm --prefix frontend install
RUN npm install
COPY frontend/.prettierrc.json frontend/tsconfig.json frontend/
COPY frontend/src frontend/src/
RUN npm --prefix frontend run all-pipeline
COPY .prettierrc.json ./
COPY src src/
RUN npm run fmt-check


### Release
FROM base as release
RUN npm install --only prod
COPY --from=builder frontend/build/ frontend/build/
COPY src src/
EXPOSE 3000
CMD [ "npm", "start"]
