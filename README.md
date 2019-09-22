# VUTTR

A front-end web application for tools management, like [described at](https://www.notion.so/Front-end-c12adcdbe7a1425dbfbcd5a397b4ff10).

Created by [create-react-app](https://cli.vuejs.org/).

The Reactjs version used can be watched at package.json file in app folder.

Beyond app folder, there are 2 (two) submodules:

1. `api`: embeds the source [available at](https://gitlab.com/bossabox/challenge-fake-api). It servers as application backend since it is a acceptance criteria. Therefore, it was deployed in an environment mounted on [heroku](https://heroku.com) [at](https://vuttr-rest-api.herokuapp.com/).
2. `e2e`: As the name suggests, it saves settings needed to run end-to-end tests for the application. It uses [CucumberJS](https://cucumber.io/) e [Nightwatch-API](https://nightwatch-api.netlify.com/).

## Development

It is need to have [docker-compose](https://docs.docker.com/compose/), version `1.17.0+`, that supports `3.4` [version configuration file](https://docs.docker.com/compose/compose-file/).

### Up the environment
```bash
docker-compose up -d
```
### Running unit tests in watch mode
```
docker-compose exec app /bin/sh -c 'yarn test:unit --watchAll'
```
### Running e2e tests (firefox)
```
docker-compose e2e /bin/sh -c 'npm run cucumber'
```
### Running e2e tests (chrome)
```
docker-compose exec e2e /bin/sh -c 'browser=chrome npm run cucumber'
```
### Accessing app by browser

If you want to use the application while developing (for some visual adjustment, for example), go to [http://localhost:4400](http//localhost:4400).

### Restarting api database

If you want to use a different data mass, it is just create/replace `api/.db.json` file. There is a sample original file, `api/db.json`.

## Deploying

Once the demand is finished, in the appropriate branch, just merge it into the master branch and push it to the remote repository. That action will trigger a new build on [travisci. That action will trigger a new build at [Travis-CI](https://travis-ci.org/vuttr-app/frontend), submitting the code to `lint tests`, `unit tests` and `e2e tests` and, on success, it will publish the new version [on](https://vuttr-app.github.io/). It is possible to confirm that new version was published watching the Travis-CI build number in the title of the main page.
