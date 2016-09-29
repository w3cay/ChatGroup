var crypto = require('crypto');
var userModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            var resUser = {
                _id: user._id,
                mobile: user.mobile,
                username: user.username,
            };
            return res.json(resUser);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {

        var user = new userModel({
			uuid : req.body.uuid,
			username : req.body.username,
			mobile : req.body.mobile,
			avatar : req.body.avatar,
			sex : req.body.sex,
			type : req.body.type,
			brithday : req.body.brithday,
			city : req.body.city,
			district : req.body.district,
			latitude : req.body.latitude,
			longitude : req.body.longitude,
			createdAt : req.body.createdAt,
			updatedAt : req.body.updatedAt,
			password : req.body.password,
            salt : '',
        });
        // 创建salt
        crypto.randomBytes(32, function (err, salt) {
            if (err) { throw err;}
            user.salt = salt.toString('hex');
        
        // 加密密码
            crypto.pbkdf2(user.password, user.salt, 4096, 64, function (err,hash) {
                if (err) { throw err; }
                hash = hash.toString('hex');
                user.password = hash;
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating user',
                            error: err
                        });
                    }
                    return res.status(200).json(user);
                });
            })
        })
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.uuid = req.body.uuid ? req.body.uuid : user.uuid;
			user.username = req.body.username ? req.body.username : user.username;
			user.mobile = req.body.mobile ? req.body.mobile : user.mobile;
			user.avatar = req.body.avatar ? req.body.avatar : user.avatar;
			user.sex = req.body.sex ? req.body.sex : user.sex;
			user.type = req.body.type ? req.body.type : user.type;
			user.brithday = req.body.brithday ? req.body.brithday : user.brithday;
			user.city = req.body.city ? req.body.city : user.city;
			user.district = req.body.district ? req.body.district : user.district;
			user.latitude = req.body.latitude ? req.body.latitude : user.latitude;
			user.longitude = req.body.longitude ? req.body.longitude : user.longitude;
			user.createdAt = req.body.createdAt ? req.body.createdAt : user.createdAt;
			user.updatedAt = req.body.updatedAt ? req.body.updatedAt : user.updatedAt;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * userController.login()
     */
    login: function(req, res) {

        var reqUser = new userModel({
            mobile : req.body.mobile,
            password: req.body.password,
        });
        userModel.findOne({mobile: reqUser.mobile }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: '(⊙o⊙)出现异常',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: '(⊙o⊙)该手机号码未注册'
                });
            }

            crypto.pbkdf2(reqUser.password, user.salt, 4096, 64, function (err,hash) {
                if (err) { throw err; }
                hash = hash.toString('hex');
                if( hash === user.password ) {
                  req.session.userid = user._id;
                  return res.status(200).json({
                    userId:  user._id,
                  });
                } else{
                    return res.status(401).json({
                      message: '(⊙o⊙)密码错误'
                    });
                }

            })
            
           
         });
    },
};
