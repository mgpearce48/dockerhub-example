FROM alpine:3.13.5

WORKDIR /react
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

