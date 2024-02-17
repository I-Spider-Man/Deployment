FROM maven:3.8.3-openjdk-17 as builder
RUN apt-get update && apt-get install -y git
RUN git init && git remote add origin https://github.com/I-Spider-Man/Trip-Partner.git
RUN git pull origin main
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B dependency:go-offline dependency:resolve-plugins clean package -DskipTests
RUN mvn -o -B package -DskipTests
FROM openjdk:17
WORKDIR /app
COPY --from=builder /app/target/Trip-Partner-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
CMD [ "java","-jar","app.jar"]