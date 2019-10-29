const express = require('express');
const hubsRouter = require('./hubs/hubs-router.js');
const server = express();
server.use(express.json());
server.get('/', (req, res) => {
 res.send(`
   <h2>Jordans endpoints</h>
 `);
});
server.use('/api/hubs', hubsRouter)
server.listen(4000, () => {
 console.log('\n*** Server Running on http://localhost:2000 ***\n');
});