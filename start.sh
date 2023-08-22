# This file is how Fly starts the server (configured in fly.toml). Before starting
# the server though, we need to run any prisma migrations that haven't yet been
# run, which is why this file exists in the first place.
# Learn more: https://community.fly.io/t/sqlite-not-getting-setup-properly/4386

#!/bin/sh

set -ex
npx prisma migrate deploy

export EMAIL=shallow.well11@gmail.com
export PASSWORD=cMAl4e3W60NmbTE
npx prisma db seed 
npm run start