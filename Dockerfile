FROM node:20-alpine AS frontend-build

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY . .

RUN mkdir -p src/main/java
RUN cp *.java src/main/java/
RUN rm -f src/main/java/*Test.java

RUN mkdir -p src/main/resources/static
COPY --from=frontend-build /frontend/dist/ /app/src/main/resources/static/

RUN mvn clean package -DskipTests


FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 10000

CMD ["sh", "-c", "java -Dserver.port=${PORT:-10000} -jar app.jar"]
