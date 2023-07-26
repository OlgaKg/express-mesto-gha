const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// app.use((req, res, next) => {
//   req.user = {
//     _id: '64bc68f10e16c7c7b9f31183',
//   };
//   next();
// });

app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
