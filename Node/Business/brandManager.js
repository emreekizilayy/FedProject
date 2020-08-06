var mongo = require('./../Context/mongo');
const { brand } = require('./../Context/mongo');

const brandmanager = {
    get: (req, res) => {
        mongo.brand.find({ "isdeleted": false }, (err, doc) => {
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
        mongo.brand.findById(id, (err, doc) => {
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
        var brandım = brandmanager.getbyname(req.body.name,true);
        brandmanager.getbyname(req.body.name,true).then((brand) => {
            if(brand){
                brandmanager.activatebrand(req.body.name,req.body.description);
            }
            else{
                var wu = new mongo.brand({
                    name: req.body.name,
                    description: req.body.description
                });
                wu.save();
            }

        });
        res.json({ "msg": "OK!" });

    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.brand.findById(id, (err, doc) => {
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
        mongo.brand.findById(id, (err, doc) => {
            if (!err) {
                doc.name = req.body.name != null ? req.body.name : doc.name;
                doc.description = req.body.description != null ? req.body.description : doc.description;

                doc.save();
                res.json({ "msg": "Updated!" });
            }
        })
    },
    getbyname : (name,isdeleted) => {
        return mongo.brand.findOne({name:name,isdeleted:isdeleted});
    },
    activatebrand : (name,description) => {
        mongo.brand.findOne({name:name} ,(err,doc) => {
            if(!err){
                doc.isdeleted = false;
                doc.description = description;
                doc.save();
            }
        })
    },
}


module.exports = {
    brandmanager
}