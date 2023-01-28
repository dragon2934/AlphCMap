cp .env .env.local
cp package.json package.local
cp .env.prd .env
cp package.prd package.json
yarn build
cp package.local package.json
cp .env.local .env