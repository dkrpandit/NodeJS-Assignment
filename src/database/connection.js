const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/nodeJSAssignment')
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => {
    console.log(`We got an error: ${err}`);
  });
