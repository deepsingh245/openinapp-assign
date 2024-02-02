// const express = require('express');
// const router = express.Router();
// const User = require('./models/user')

const accountSid ="ACf5da520f5ad198b876e9b98ac788fe83";
const authToken = "";//toekn
const client = require('twilio')(accountSid, authToken);


// router.get('/api/get_users',(req,res)=>{
//     try {
//         // const get_user= User.find({})
//         // const pri = get_user.priority
//         // res.json({data:get_user})
//         
    

//     } catch (error) {
//         console.log(error)
//     }

// });

// module.exports = router;
client.calls.create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '',//where you want to call
    from: '+16599009597'//your number
  })
 .then(call => console.log("calling user:",call.sid));