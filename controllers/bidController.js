const Bid = require('../models/bid');
const Util = require('../Util/Util');


const bid_add = (req, res) => {
    console.log(req.files);
    const bid = new Bid(req.body);
    bid.save()
        .then(result => {
            res.json({ status: 200, data: result });
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message } })
            console.log(err);
        });
}


const bids = (req, res,) => {
    Bid.find().sort({ createdAt: -1 })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, data: { msg: "No bid found" } });
            }
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message } });
        });
}



const bid_by_ID = (req, res) => {
    Bid.find({ product_id : req.params.id })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, data: { msg: "No bid found with given ID" } });
            }
        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message } });
        });

};


const bid_delete = (req, res) => {

    Bid.findByIdAndDelete(req.params.id)
        .then(result => {
            if (result != null)
                res.json({ status: 200, data: { msg: 'Bid deleted successfully', _id: req.params.id } });
            else
            res.json({ status: 300, data: { msg: "No bid found", _id: req.params.id } });

        })
        .catch(err => {
            res.json({ status: 400, data: { msg: err.message, _id: req.params.id } });
            console.log(err);
        });
}

module.exports = {
    bid_add,
    bids,
    bid_by_ID,
    bid_delete
};