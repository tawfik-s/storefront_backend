# store front backend

this is an API for backend application with the requirements in the requirements document

the API is full covered by integration and unit testing

## Setup Steps

To get started:

1-clone the repo on the machine

2-install all dependencies by running command

```bash
npm  install
```

3-create a `.env` file with all the required environment variables:

```bash
POSTGRES_HOST="localhost"
POSTGRES_DB="store_backend"
POSTGRES_TEST_DB="store_backend_test"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="admin"
ENV="test"
BCRYPT_PASSWORD="speak-friend-and-enter"
SALT_ROUNDS="10"
PORT=4000
ACCESS_TOKEN_SECRET="noobs123"

```

4-Now, check if Postgres has the database `database_dev`, if not create it:

```bash

# Postgres shell
create database  store_backend;
create database  store_backend_test;

```

5-run npm test to test and build the project all tests must success

6-chenge the value of env in .env to be test when you testing and dev when you run the API

#### Runing the program locally in development mode

`npm run start`

-and then head to your browser at `localhost:3000` and it should be working.

#### Test the app

```bash
    npm run test

```

##### before you test the app

```bash

db-migrate reset --env test

```

to reset the test data base

#### Runing the program locally in production mode

`npm run build`

`node dist/index.js`

#### Code formating

I'm using prettier

`npm run prettier`
I'm using eslint

`npm run lint`

### scripts
`npm run test` to test the project
`npm run build` convert typescript to javascript in dist folder
`npm run run` build and run the project
`npm lint` run eslint
`npm run prettier`
=======

- `npm run test` to test the project
- `npm run build` convert typescript to javascript in dist folder
- `npm run run` build and run the project
- `npm lint` run eslint
- `npm run prettier`

## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [npm](https://npm.com/) - The dependency manager
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework
