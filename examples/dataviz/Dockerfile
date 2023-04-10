FROM postgres

RUN apt-get update && apt-get install -y --no-install-recommends \
  libc-dev-bin \
  libc6-dev \
  libc-dev \
  libiconv-hook1 \
  libiconv-hook-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ADD https://raw.githubusercontent.com/lerocha/chinook-database/master/ChinookDatabase/DataSources/Chinook_PostgreSql.sql /Chinook_PostgreSql.sql

RUN iconv -f ISO-8859-1 -t UTF-8 /Chinook_PostgreSql.sql > /Chinook_PostgreSql_utf8.sql

RUN mv /Chinook_PostgreSql_utf8.sql /docker-entrypoint-initdb.d/Chinook_PostgreSql_utf8.sql

RUN chmod -R 777 /docker-entrypoint-initdb.d
