var mongo = require('./../Context/mongo');
const { product } = require('./../Context/mongo');

const productmanager = {
    get: (req, res) => {
        mongo.product.find({ "isdeleted": false }).populate({path: 'category'}).populate({path: 'brand'}).exec((err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        });
    },
    delete: (req, res) => {
        var id = req.body.id;
        console.log(id);
        mongo.product.findById(id, (err, doc) => {
            if (!err) {
                doc.isdeleted = true;
                doc.save();
                res.json({ "msg": "Success!" });
            }
            else {
                res.json(err);
            }
        })
    },
    insert: (req, res) => {
        var wu = new mongo.product({
            name: req.body.name,
            description: req.body.description == null ? "" : req.body.description,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand
        });

        wu.save();

        res.json({ "msg": "OK!" })
    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.product.findById(id, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        })
    },
    update: (req, res) => {
        var id = req.body._id;
        mongo.product.findById(id, (err, doc) => {
            if (!err) {
                doc.name = req.body.name != null ? req.body.name : doc.name;
                doc.description = req.body.description != null ? req.body.description : doc.description;
                doc.price = req.body.price != null ? req.body.price : doc.price;
                doc.category = req.body.category != null ? req.body.category : doc.category;
                doc.brand = req.body.brand != null ? req.body.brand : doc.brand;

                doc.save();
                res.json({ "msg": "Updated!" });
            }
        })
    },
    getbyname : (name) => {
        return mongo.product.findOne({name:name,isdeleted:false});
    },
    getbycategory : (req, res) => {
        var category = req.params.category;
        mongo.product.find({ "isdeleted": false ,category:category}, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        });
    },
    getbybrand : (req, res) => {
        var brand = req.params.brand;
        mongo.product.find({ "isdeleted": false ,brand:brand}, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        });
    }
}

module.exports = {
    productmanager
}