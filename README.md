## WP-build
A simple setup for developing wordpress themes and plugins using webpack and docker

## Requirements:
- node 12
- docker

## How to use
- Run `npm i` to install dependencies
- Edit theme-config.json to match your setup.
- Run `npm run watch` to start watching for changes in src folder.
- Run `docker-compose up` to  bring up the mysql and webserver.

The app is now running on `http://localhost:1337`

## Theme development
Files in theme-src are available inside wordpress > appearance > themes as "mytheme"
The header.php and footer.php files will include the css and javascript that webpack bundles



