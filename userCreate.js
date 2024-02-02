const express = require("express");
const { validationResult } = require("express-validator");
const user = require("./models/user");
const router = express.Router();
var jwt = require("jsonwebtoken");

router.post(
  "/api/signup",

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id,name, phone, priority } = req.body;
      const existingUser = await user.findOne({ phone });

      if (existingUser) {
        return res.status(400).json({
          status: false,
          errors: [
            {
              param: "phone",
              message: "User with this phone number already exists.",
              code: "RESOURCE_EXISTS",
            },
          ],
        });
      }
      let data = new user({
        id: id,
        name: name,
        phone: phone,
        priority: priority,
      });
      data.save();
      const access_token = jwt.sign(
        { id: data.id},
        "token"
      );
      // localStorage.setItem('jwtToken', access_token);
      console.log(access_token);
      res.cookie("jwt", access_token ,{httpOnly : true}).send({
        status:"ok",
        token:access_token,
        user:{
          id:data.id,
          name:data.name,
          phone:data.phone
        }
      });
      
    } catch (err) {
      next(err);
    }
      })
//       res.json({
//         status: true,
//         content: {
//           data: {
//             id: data.id,
//             name: data.name,
//             phone: data.phone,
//             priority: data.priority,
//           },
//           meta: { access_token },
//         },
//       });
//     } catch (e) {
//       console.log(e);
//       res.status(400).send(e);
//     }
//   }
// );

module.exports = router;
