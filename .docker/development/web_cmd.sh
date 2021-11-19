#!/usr/bin/env bash

eval $(~/.linuxbrew/bin/brew shellenv)

mkdir -p $SSL_CERT_HOME
chmod 755 $SSL_ROOT

mkcert -install

mkcert -cert-file $SSL_CERT_HOME/cert.pem -key-file $SSL_CERT_HOME/privkey.key simpleauthapp.net

openssl verify $SSL_CERT_HOME/cert.pem

# start Nginx in foreground so Docker container doesn't exit
nginx -g "daemon off;"
