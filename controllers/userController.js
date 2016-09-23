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
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({			uuid : req.body.uuid,			username : req.body.username,			mobile : req.body.mobile,			avatar : req.body.avatar,			sex : req.body.sex,			type : req.body.type,			brithday : req.body.brithday,			city : req.body.city,			district : req.body.district,			latitude : req.body.latitude,			longitude : req.body.longitude,			createdAt : req.body.createdAt,			updatedAt : req.body.updatedAt,			password : req.body.password
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
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

            user.uuid = req.body.uuid ? req.body.uuid : user.uuid;			user.username = req.body.username ? req.body.username : user.username;			user.mobile = req.body.mobile ? req.body.mobile : user.mobile;			user.avatar = req.body.avatar ? req.body.avatar : user.avatar;			user.sex = req.body.sex ? req.body.sex : user.sex;			user.type = req.body.type ? req.body.type : user.type;			user.brithday = req.body.brithday ? req.body.brithday : user.brithday;			user.city = req.body.city ? req.body.city : user.city;			user.district = req.body.district ? req.body.district : user.district;			user.latitude = req.body.latitude ? req.body.latitude : user.latitude;			user.longitude = req.body.longitude ? req.body.longitude : user.longitude;			user.createdAt = req.body.createdAt ? req.body.createdAt : user.createdAt;			user.updatedAt = req.body.updatedAt ? req.body.updatedAt : user.updatedAt;			user.password = req.body.password ? req.body.password : user.password;			
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
    }
};
