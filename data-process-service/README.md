# Ad Metrics

## Overview
An ad counter simulation system


## Features
1. Periodic cron jobs to fetch ad data
2. Prometheus data scrapping and insertion
3. Prometheus counter for number of ads
4. Randomized date and ad metric generatrion
5. Prometheuse alert manager
6. Webhook to receive prometheus alerts on new data
7. Web socket connection for realtime updates on client dashboard
8. One off odcker compose deployment


## Technologies Used
- *React Next JS**
- **Nest JS** (ACID-compliant transactions)
- **Prometheus** (Queueing, caching, rate-limiting)
- **Prometheus Alert Manager** (Transaction queue processing)
- **Web Sockets** (Authentication)
- **GRAPH QL** (Logging)
- **Tailwind & Shadcn** (Input validation)
- **Docker & Docker Compose** (DB schema, ORM, DB connection, QUeries, types)






## Prerequisites
- Node.js (v22 or later) for local run (not recommended)


## Set Up
1. Clone the repository:
   ```**sh**
   git clone https://github.com/Anyungu/ad-metrics-backend
   cd ad-metrics-backend
   ```

2. Set up environment variables:
   Create a `.env.docker` file in the root directory and configure the following:
   ```env
   INSIGHTS_BASE_URL='http://ad-insight-service:8080/graphql'
   ```

3. Use the docker-compose to spin up all the containers.

```sh
   docker-compose up -d
```

## Host IPAaddresses
> preview prometheus here: `http://localhost:9090/`

> preview prometheus alerts manager here: `http://localhost:9093/`

> preview the ads service here: `http://localhost:8081/`

> preview the data processing service here: `http://localhost:8082/`

## Connections

### Metrics (data processing service)
| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
|    |  |     |
|`GET `   | `/metrics`    | Get Metrics for prometheus    |
| `Post `   | `/webhook`      | receive data notifications from prometheus to publish to the wbescocket client    |


### GraphQL Endpoint to Get Insights
| Method | Endpoint  | Description |
|--------|----------|-------------|
| `POST` | `/graphql` | Fetch insights with start date, stop date, and impressions |

---

### WebSocket Connection for Insights
| Action  | URL              | Event Name   | Description |
|---------|----------------|-------------|-------------|
| Connect | `ws://yourserver/ws` | `impressions` `total_impressions` | Listen for real-time impression data |




