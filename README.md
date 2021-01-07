# Greeting

Greeting API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

| Framework | Version  |
| ----------| -------- |
| Node      | 12.XX.XX |
| NPM       | 6.XX.XX  |

### Download and install dependencies

```shell
$ git clone https://github.com/yosama/greeting.git
$ cd greeting
$ npm install
```

### Usage

```shell
npm start start:dev
```

## API v1 info

### Swagger

The API can be used with the path: 
[API V1](http://localhost:3000/api)


## General configuration

### Environment variables

| Name                  | Description                                | Default                      |
| --------------------- | ------------------------------------------ | -----------------------------|
| API_HOST              | API host                                   | `0.0.0.0`                    |
| API_PORT              | API port                                   | `3000`                       |
| ENDPOINT_ROUTE        | Global URL prefix                          | NO DEFAULT VALUE             |
| SIMPLE_ARRAY          | Greeting list                              | `hallo,hola,ciao,bonjour,oi` |
| NODE_ENV              | Production or development mode             | `development`                |
| LOGGING_LEVEL         | Logs level                                 | `INFO`                       |
| **Section of other services**                                                                   |||
| API_URL               | Jsonbin API url                            | `https://api.jsonbin.io/b/5f69afbe65b18913fc510ce8`|


## Running the tests

### Unit tests

```shell
npm run test:unit
```

### E2E tests

```shell
npm run test:e2e
```

### Integration tests

```shell
npm run test
```

## Built With

* [NestJS](https://nestjs.com/) - The web framework used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.org/yosama/greeting/tags).


### Generate Release

```shell
npm run release
```

## Docker

### Generate development Docker image
```shell
npm run build:dev-image
```
### Generate production Docker image
```shell
npm run build:pro-image
```
### Docker compose
```shell
docker-compose up greeting
```

### Docker hub repository
[Greeting repository](https://hub.docker.com/repository/docker/yosama/greeting)

### Answers

- SQL: SQLite, SQL Server, MySQL, PostgreSQL
- NOSQL: MongoDB, DynamoDB, Elastic Search
- RabbitMQ: Yes, less than a year.
- Git: Yes

## License

[ISC](https://choosealicense.com/licenses/isc/)
