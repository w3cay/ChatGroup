var carModel = require('../models/carModel.js');

/**
 * carController.js
 *
 * @description :: Server-side logic for managing cars.
 */
module.exports = {

    /**
     * carController.list()
     */
    list: function (req, res) {
        carModel.find(function (err, cars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            return res.json(cars);
        });
    },

    /**
     * carController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        carModel.findOne({_id: id}, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }
            return res.json(car);
        });
    },

    /**
     * carController.create()
     */
    create: function (req, res) {
        var car = new carModel({			name : req.body.name,			age : req.body.age,			return : req.body.return
        });

        car.save(function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating car',
                    error: err
                });
            }
            return res.status(201).json(car);
        });
    },

    /**
     * carController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        carModel.findOne({_id: id}, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }

            car.name = req.body.name ? req.body.name : car.name;			car.age = req.body.age ? req.body.age : car.age;			car.return = req.body.return ? req.body.return : car.return;			
            car.save(function (err, car) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating car.',
                        error: err
                    });
                }

                return res.json(car);
            });
        });
    },

    /**
     * carController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        carModel.findByIdAndRemove(id, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the car.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
