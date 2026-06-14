create extension if not exists vector;
create table repositories (
  id bigint primary key, github_node_id text unique not null, owner_id bigint not null,
  name text not null, full_name text unique not null, description text, default_branch text,
  topics text[] not null default '{}', stars bigint not null default 0, forks bigint not null default 0,
  watchers bigint not null default 0, repository_size bigint not null default 0,
  file_count bigint not null default 0, folder_count bigint not null default 0,
  loc bigint not null default 0, commit_count bigint not null default 0,
  contributor_count integer not null default 0, max_depth integer not null default 0,
  book_score numeric not null default 0, rank text not null default 'Scroll',
  genome jsonb not null default '{}', github_updated_at timestamptz, indexed_at timestamptz,
  created_at timestamptz not null default now()
);
create index repositories_score_idx on repositories (book_score desc);
create index repositories_topics_idx on repositories using gin (topics);

create table repository_metric_history (
  repository_id bigint references repositories(id), recorded_at timestamptz not null,
  stars bigint, forks bigint, commits bigint, contributors integer, files bigint, loc bigint,
  primary key (repository_id, recorded_at)
);
create table repository_files (
  repository_id bigint references repositories(id), ref text not null, path text not null,
  blob_sha text not null, language text, bytes bigint, loc integer, depth integer,
  primary key (repository_id, ref, path)
);
create table repository_embeddings (
  repository_id bigint primary key references repositories(id), embedding vector(1536), model text not null
);
create index repository_embeddings_hnsw on repository_embeddings using hnsw (embedding vector_cosine_ops);

create table users (id uuid primary key, handle text unique, avatar_url text, created_at timestamptz default now());
create table collections (id uuid primary key, user_id uuid references users(id), name text not null, is_public boolean default true);
create table collection_books (collection_id uuid references collections(id), repository_id bigint references repositories(id), primary key(collection_id, repository_id));
create table follows (user_id uuid references users(id), repository_id bigint references repositories(id), primary key(user_id, repository_id));
create table reviews (user_id uuid references users(id), repository_id bigint references repositories(id), rating smallint check(rating between 1 and 5), body text, primary key(user_id, repository_id));
create table webhook_events (delivery_id uuid primary key, event_type text not null, repository_id bigint, payload jsonb not null, received_at timestamptz default now(), processed_at timestamptz);
