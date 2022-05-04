# Modern Web Development Technologies and Approaches

## Prerequisites

    sudo npm install -g typescript
    sudo npm install -g ts-node

## Run

```bash
sudo docker-compose up

docker-compose -f docker-compose.prod.yml up
```

## Docker Commands

Remove all containers:
```bash
docker rm -vf $(docker ps -a -q)
```

Remove all images:
```bash
docker rmi -f $(docker images -a -q)
```

## Prisma Commands

Push schema into database:
```bash
yarn prisma db push
```
