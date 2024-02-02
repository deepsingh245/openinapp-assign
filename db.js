const mongoose = require("mongoose");

const MongoURI ='mongodb+srv://openinapp:open123@cluster0.rewqrvw.mongodb.net/openinapp?retryWrites=true&w=majority';

const mongoDB = () => {
 try{ mongoose
    .connect(MongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
      
    })}
    catch(err){
      console.error(err);
    };
};
module.exports = mongoDB;
