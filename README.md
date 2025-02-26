<h1 align="center">Subscription Management Backend</h1>

<p align="center">A simple and efficient backend application for managing subscriptions. Designed with a focus on backend performance, scalability, and maintainability.</p>

### Techonolgies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)

### Running

```bash

# 1. Clone this repository
git clone https://github.com/tulioneme/subscription-server.git
cd subscription-server

# 2. Install dependencies
npm install

# 3. Start Docker containers (PostgreSQL & Redis)
docker-compose up -d  # Runs in detached mode (background)

# 4. Configure environment variables in the `.env` file
echo '"PORT=3333"
POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
REDIS_URL="redis://localhost:6379"
WEB_URL="http://localhost:3000"' > .env

# 5. Run the application in development mode
npm run dev

# The server will start on: http://localhost:3000

# 6. (Optional) Build the application for production
npm run build

```
