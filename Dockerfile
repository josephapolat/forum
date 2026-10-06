FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY *.java .

RUN mkdir -p src/main/java src/main/resources

RUN cp *.java src/main/java/

RUN cp application.properties src/main/resources/

RUN rm -f src/main/java/*Test.java

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 9000

CMD ["java", "-jar", "app.jar"]
