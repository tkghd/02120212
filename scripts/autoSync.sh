#!/bin/bash
while true; do
  curl -s https://tkghd.vercel.app/api/cron/sync > /dev/null
  sleep 60
done
