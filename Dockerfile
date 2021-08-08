FROM node:14.17-alpine
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]