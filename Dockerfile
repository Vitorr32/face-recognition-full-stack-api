FROM node:carbon 

WORKDIR /usr/src/face-recognition-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]