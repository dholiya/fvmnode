const Location = require('../models/location');
const Util = require('../Util/Util');


const location_add = (req, res) => {
    const location = new Location(req.body);
    location.save()
        .then(result => {
            res.json({ status: 200, data: result });
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message } })
            console.log(err);
        });
}


const locations = (req, res) => {
    Location.find().sort({ createdAt: -1 })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, data: { msg: "No location found" } });
            }
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message } });
        });
}



const location_by_ID = (req, res) => {

    Location.findOne({ product_id: req.params.id })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, data: { msg: "No location found with given ID" } });
            }
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message } });
        });
};



const location_update = (req, res) => {

    Location.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(result => {
            result != null ? res.json({ status: 200, data: { msg: 'Location data updated successfully' } }) :
                res.json({ status: 300, data: { msg: 'Something went wrong, please contact customer advisor' } });
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: 'Something wrong to update location data' } });
        });
}



const location_delete = (req, res) => {

    Location.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result != null)
                res.json({ status: 200, data: { msg: 'Location deleted successfully', _id: req.params.id } });
            else
                res.json({ status: 300, data: { msg: 'Location not found', _id: req.params.id } });
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message, _id: req.params.id } });
            console.log(err);
        });
}


module.exports = {
    locations,
    location_add,
    location_by_ID,
    location_update,
    location_delete
};