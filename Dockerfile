 FROM index.qiniu.com/node

  WORKDIR /app
  ADD package.json /app/
  RUN npm install
  ADD . /app

  EXPOSE  8080
  CMD []
  ENTRYPOINT ["/bin/bash", "run.sh"]
