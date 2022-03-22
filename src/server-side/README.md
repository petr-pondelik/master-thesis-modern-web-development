# Master Thesis: Modern Web Development

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

NPM:
```bash
$ npm install
```

Yarn:
```bash
$ yarn
```

## Running the app

### Without Docker

NPM:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Yarn:
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Using Docker

```bash
sudo docker build . -t petr-pondelik/master-thesis-server-side-app

sudo docker run -p 8080:3000 petr-pondelik/master-thesis-server-side-app
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
