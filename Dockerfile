FROM node:18
# RUN npm install yarn
RUN yarn
RUN mkdir /app
WORKDIR /app
COPY . /app
ENV REACT_APP_API_URL REACT_APP_API_URL
RUN yarn install
RUN ls -a
CMD ["yarn", "run", "start"]