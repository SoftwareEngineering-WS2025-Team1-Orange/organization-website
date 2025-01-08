FROM node:22 AS builder

# Install Java
RUN apt-get update && apt-get install -y openjdk-17-jre && rm -rf /var/lib/apt/lists/*

WORKDIR /organization-website

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run generate:api

RUN npm run build --omit=dev

FROM nginx:1.27.2-bookworm AS runner

WORKDIR /

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /organization-website/dist/organization-website/browser /usr/share/nginx/html/organization-website

EXPOSE 80

