FROM node:24-alpine

WORKDIR /src/app

COPY /src/index.js /home/ec2-user/EmergencySystem

RUN --from=build /src/app .

EXPOSE 80

CMD ["node","app.js"]