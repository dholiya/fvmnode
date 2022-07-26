const User = require('../models/user');
const Util = require('../Util/Util');

const jwt = require('jsonwebtoken');

const users = (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    });
}


const user_login = (req, res) => {

  res.set({ contestType: Util.multipartFormData})

  User.findOne(req.body).then(result => {
    if(result != null){

      const accessToken = jwt.sign(result.id, process.env.ACCESS_TOKEN_SECRET);

      res.json({status : 200 , accessToken : accessToken , data: result});
    } else
      res.json({status : 300 , data: { msg: "Wrong email or/and passowrd" }});
    })
    .catch(err => {
      res.json({status : 400 , data: {msg: err.message}});
    });    
}



const user_register = (req, res) => {
  const user = new User(req.body);
  user.save()
      .then(result => {
          res.json({ status: 200, data: result });
      })
      .catch(err => {
          res.json({ status: 400, data: { msg: err.message } })
          console.log(err);
      });

}



const user_delete = (req, res) => {

  User.findByIdAndDelete(req.body.id)
    .then(result => {
      if(result != null)
        res.json({status : 200 , data: { msg: 'User deleted successfully', _id :req.body.id  }});
      else
        res.json({status : 300 , data: { msg: 'User not found', _id :req.body.id }});
    })
    .catch(err => {
      res.json({status : 400 , data: { msg: err.message, _id :req.body.id }});
      console.log(err);
    });
}



const user_update_password = (req, res) => {
  console.log(req);

  res.set({contestType: Util.multipartFormData})

  User.findByIdAndUpdate( req.body.id, { password: req.body.password}, {useFindAndModify: false})
    .then(result => {
      result!=null?res.json({status : 200 , data: { msg: 'Password reset successfully'}}):
      res.json({status : 300 , data: { msg: 'User not found'}});
    })
    .catch(err => {
      res.json({status : 400 , data: { msg: 'Password not reset please contact customer care advisor'}});
      console.log(err);
    });
}



module.exports = {
  users,
  user_login, 
  user_register, 
  user_delete,
  user_update_password
}