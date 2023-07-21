#!/bin/sh

FILE="/usr/src/app/package.json"

if [ ! -f "$FILE" ]
then
  tar -xzf /usr/src/appEntry/app.tar.gz -C /usr/src/app/
fi

sh /usr/src/appEntry/replace-env.sh

node docker/main.js