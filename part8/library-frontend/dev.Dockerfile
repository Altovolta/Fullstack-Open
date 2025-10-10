FROM node:24

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_HOST=/api/

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]