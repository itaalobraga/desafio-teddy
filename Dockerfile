FROM node:21.7.3

WORKDIR /app

RUN npm install -g pnpm@8.6.12

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 9000

CMD ["pnpm", "start"]