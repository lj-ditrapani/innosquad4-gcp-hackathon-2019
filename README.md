This app needs 2 api keys.

- ipstack: Add a file called ./apiKey.txt and paste in your ipstack.com api key. 
  The file is gitignored. 
- Google Maps:
  Add a google maps API key to a file frontend/public/apiKey.txt. (also gitignored)

Build

    sh build.sh

Run

    sh docker-run.sh

Test backend

    sh test-upload.sh

Develop

    cd frontend
    npm install
    npm run build
    cd ..
    npm start
