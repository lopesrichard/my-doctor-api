#!/bin/bash

pnpm typeorm -- migration:generate src/migrations/$1 -d src/data-source.ts --pretty