const fs = require('fs');

const ENCODE = 'utf-8';

const mongodbContent = `
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
`;

let mongodbFilePath = `/etc/yum.repos.d/mongodb-org-4.0.repo`;

fs.writeFileSync(mongodbFilePath, mongodbContent, ENCODE);

console.log('Mongodb install successfully');
