FROM node:18.20.8-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3003
CMD ["node", "src/index.js"]
