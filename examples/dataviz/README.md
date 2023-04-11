#### Install dependencies
```shell
yarn
```

#### Build Postgres docker image
```shell
docker build -t chinook .
```

#### Run Postgres docker container
```shell
docker run --name chinook -p 5432:5432 -e POSTGRES_PASSWORD=password -d chinook
```

#### Build example
```shell
yarn build
```

#### Run example
```shell
yarn start
```
