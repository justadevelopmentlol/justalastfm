#!/bin/sh
set -eu

node dist/register-commands.js
exec node dist/index.js
