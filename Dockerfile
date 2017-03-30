FROM node:6.10.1

# NODE_ENV - node env, should always be production in non dev.
# APP_ENV - application env, can be used to load specific config profile for application
ENV NODE_ENV=production
ENV APP_ENV=production

WORKDIR /tmp

COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN cp -a /tmp/node_modules /usr/src/app/

CMD ["npm", "run", "serve"]

EXPOSE 3000