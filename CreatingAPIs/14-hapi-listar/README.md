```sh
docker run \
 --name postgress \
 -e POSTGRES_USER=marcelowis \
 -e POSTGRES_PASSWORD=minhasenhasecreta \
 -e POSTGRES_DB=heroes \
 -p 5434:5432 \
 -d \
 postgres
```

docker exec -it postgres /bin/bash

```sh
docker run \
--name adminer \
-p 8080:8080 \
 --link postgress \
 -d \
 adminer
```

```sh
  docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4
```

```sh
  docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb \
    -d \
    mongoclient/mongoclient
```

```sh
  docker exec -it mongodb \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('herois').createUser({user: 'marcelowis', pwd: 'admin', roles: [{role: 'readWrite', db: 'herois'}]})"
```
