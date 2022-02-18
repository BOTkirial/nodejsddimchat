from node:alpine

copy . /livechat
WORKDIR /livechat

RUN npm install --no-optional && npm cache clean --force

CMD node ./api/index.js