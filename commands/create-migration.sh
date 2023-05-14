#!/bin/bash

npm run typeorm -- migration:generate src/migrations/$1 -d src/migration.config.ts --pretty