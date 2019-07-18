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


USEFUL FILES TO ANALYZE:
========================

messages/inbox/*
 -  includes all messages ever sent. Do what you will with all of that
search_history/your_search_history.json
 -  sentiment analysis? similar to all messages
security_and_login_information/used_ip_address.json
 -  can check ip addresses to see where the person was using facebook.