ARG RUBY_VERSION

FROM ruby:$RUBY_VERSION-slim-buster

ENV APP_PATH /app
ARG PG_MAJOR
ARG NODE_MAJOR
ARG BUNDLER_VERSION
ARG YARN_VERSION

# Common dependencies
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    gnupg2 \
    curl \
    git \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

# Add PostgreSQL to sources list
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
  && echo 'deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main' $PG_MAJOR > /etc/apt/sources.list.d/pgdg.list

# Add NodeJS to sources list
RUN curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR.x | bash -

# Application dependencies
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    libpq-dev \
    nodejs \
    postgresql-client-$PG_MAJOR \
    python-dev \
    libldap2-dev \
    libidn11-dev \
    libtool \
    automake \
    autoconf \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    truncate -s 0 /var/log/*log

RUN npm install --global yarn && \
    yarn set version $YARN_VERSION

    # Configure bundler
ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=4 \
  BUNDLE_RETRY=3

ENV BUNDLE_APP_CONFIG=.bundle
ENV PATH /app/bin:$PATH

# Upgrade RubyGems and install required Bundler version
RUN gem update --system && \
    gem install bundler:$BUNDLER_VERSION

# Create a directory for the app code
RUN mkdir -p $APP_PATH

WORKDIR $APP_PATH
COPY . $APP_PATH
