const express = require('express');
const server = express();
const posts = require('./data/posts');

server.use(express.json());

server.use('/api/posts', posts);

server.get('/', (req, res) => {
  res.status(200).json('Success, Welcome !')
 });

server.listen(2000, () => {
 console.log('\n*** Server Running on http://localhost:2000 ***\n');
});