FROM node:20 AS builder

# Install tzdata for time zone configuration
RUN apt-get update && apt-get install -y tzdata

# Set the time zone to Sri Lanka (Asia/Colombo)
ENV TZ=Asia/Colombo

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]