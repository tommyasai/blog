# This file is how Fly starts the server (configured in fly.toml). Before starting
# the server though, we need to run any prisma migrations that haven't yet been
# run, which is why this file exists in the first place.
# Learn more: https://community.fly.io/t/sqlite-not-getting-setup-properly/4386

#!/bin/sh

set -ex
npx prisma migrate deploy
npm install tsconfig-paths

# Set ENV to create a user in seed.ts
export EMAIL=shallow.well11@gmail.com
export PASSWORD=cMAl4e3W60NmbTE
# Add a swap file to help with the memory limit during the build.
# https://community.fly.io/t/prisma-sqlite-causes-an-out-of-memory-error-on-deploy/11039/2
fallocate -l 256M /swapfile
chmod 0600 /swapfile
mkswap /swapfile
echo 10 > /proc/sys/vm/swappiness
swapon /swapfile
npm run seed
swapoff /swapfile
rm /swapfile

npm run start