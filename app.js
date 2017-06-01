const express = require('express');

const app = express();

app.listen(3000, (err) => {
  if (err) { throw err; }
  console.log('==============================');
  console.log('Server is running on port 4000');
  console.log('==============================');
});
