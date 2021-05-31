FROM node:14-alpine

WORKDIR /app

ADD . /app

RUN npm i

RUN npm run build

FROM node:14-alpine

EXPOSE 4000

COPY --from=0 /app/build /build

RUN npm i -g serve

CMD ["serve", "-s", "/build", "-l", "4000"]
