FROM node:22

WORKDIR /organization-website

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4200

RUN npm run build --omit=dev

CMD ["http-server", "'dist/organization-website/browser'"]
