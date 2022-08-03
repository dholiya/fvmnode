const Favorite = require('../models/favorite');
const Util = require('../Util/Util');


const favorite_add = (req, res) => {
    console.log(req.files);
    const favorite = new Favorite(req.body);
    favorite.save()
        .then(result => {
            res.json({ status: 200, data: result });
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message })
            console.log(err);
        });
}



const favorite_by_seller = (req, res) => {
    Favorite.find({ seller_id : req.params.id })
        .then(result => {
            if (result != null && result.length != 0) {
                res.json({ status: 200, data: result });
            } else {
                res.json({ status: 300, msg: "No favorite found with given ID" });
            }
        })
        .catch(err => {
            res.json({ status: 400, msg: err.message });
        });

};


const favorite_delete = (req, res) => {
    Favorite.findOneAndDelete({product_id: req.params.id})
        .then(result => {
            if (result != null && result.length != 0) 
                res.json({ status: 200,  msg: 'Product remove from favorite successfully'});
            else
            res.json({ status: 300, msg: "No favorite found"});
        })
        .catch(err => {
            res.json({ status: 400,  msg: err.message});
            console.log(err);
        });
}

module.exports = {
    favorite_add,
    favorite_by_seller,
    favorite_delete,
};
