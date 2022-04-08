FROM node:14-buster-slim as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i

COPY . ./

RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]