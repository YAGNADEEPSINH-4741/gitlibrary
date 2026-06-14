# The Library of Code - Production Architecture

## System topology

The interactive app in this repository is the product shell and domain prototype. A production deployment splits ingestion, reads, and realtime delivery so indexing work can never degrade search latency.

```text
GitHub Events/API -> Ingestion Gateway -> Kafka -> Metadata/File/Stats Workers
                                             |-> PostgreSQL + TimescaleDB
                                             |-> Meilisearch keyword index
                                             |-> pgvector semantic index
                                             |-> S3-compatible object storage

Web Client -> CDN/Next.js -> API Gateway -> Search Aggregator -> Meilisearch/pgvector/Redis
                                |-> Repository API -> PostgreSQL/Redis
                                |-> Supabase Realtime -> subscribed clients
```

## Services

- `catalog-api`: repository metadata, books, collections, reviews, follows, and leaderboards.
- `search-api`: hybrid retrieval using Meilisearch BM25, typo tolerance, filters, and pgvector reranking.
- `github-indexer`: GraphQL crawler with token pools, rate-limit budgets, checkpoints, and idempotent jobs.
- `webhook-ingress`: verifies GitHub signatures, persists raw events, and publishes normalized events.
- `repository-analyzer`: computes LOC, tree metrics, Book Score, genome, AI summaries, and embeddings.
- `realtime-fanout`: consumes normalized changes and publishes repository-scoped Supabase channels.
- `notification-worker`: materializes user notifications and web-push deliveries.

## Indexing and synchronization

Discovery uses GitHub event streams, public datasets, and partitioned GraphQL crawling. New repositories receive a shallow metadata pass first, then priority queues schedule full tree and analysis passes based on popularity/activity. All jobs use `(repository_id, source_version, analyzer_version)` idempotency keys.

Webhook events are acknowledged after durable storage, not after processing. Workers coalesce bursts per repository, fetch the new head, calculate deltas, update PostgreSQL, and atomically publish a new search document. A scheduled reconciliation crawler catches missed webhooks and repositories where webhooks cannot be installed.

## Search

Documents contain weighted fields for name, owner, topics, description, README, paths, languages, and contributors. Query flow:

1. Normalize and classify intent; retrieve autocomplete and typo candidates from Redis.
2. Run filtered Meilisearch keyword retrieval and pgvector semantic retrieval concurrently.
3. Reciprocal-rank-fuse results, apply quality/freshness signals, and return in under 100ms.
4. Log anonymized query/click events to build trending and related-search models.

## Scaling and deployment

- Kubernetes deploys stateless APIs and workers; KEDA scales workers from Kafka lag.
- PostgreSQL is partitioned by repository ID; TimescaleDB stores metric history.
- Redis Cluster provides hot books, leaderboards, autocomplete, and rate limits.
- Multi-region read replicas and CDN edge caching serve public catalog reads.
- OpenTelemetry, Prometheus, Grafana, and Sentry provide traces, metrics, and errors.
- Backups use PITR for PostgreSQL and versioned object storage; runbooks cover index rebuilds.

## API surface

```text
GET  /v1/search?q=&language=&topic=&sort=&cursor=
GET  /v1/suggestions?q=
GET  /v1/repositories/{owner}/{name}
GET  /v1/repositories/{id}/tree?ref=&path=
GET  /v1/repositories/{id}/files/{path}?ref=
GET  /v1/repositories/{id}/timeline?range=
GET  /v1/repositories/{id}/similar
POST /v1/collections
POST /v1/collections/{id}/books
POST /v1/repositories/{id}/follow
POST /v1/webhooks/github
WS   /v1/realtime/repositories/{id}
```
