This project uses docker for dev and test env.

## Docker

First, build an image using Dockerfile.dev

```bash
docker build -f Dockerfile.dev .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app image_id
```

or you can use docker-compose as

```bash
docker-compose up --build
```

To run tests, use

```bash
docker build -f Dockerfile.dev .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app image_id yarn test
```
