# Master Thesis: Modern Web Development

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
