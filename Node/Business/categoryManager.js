var mongo = require('./../Context/mongo');
const { category } = require('./../Context/mongo');

const categorymanager = {
    get: (req, res) => {
        mongo.category.find({ "isdeleted": false }, (err, doc) => {
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
        mongo.category.findById(id, (err, doc) => {
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
        mongo.category.findOne({name:req.body.name,isdeleted:true},(err,doc) => {

            if(doc !== null){
                if(!err){
                    doc.isdeleted = false;
                    doc.description = req.body.description == null ? doc.description : req.body.description;
                    doc.save();
                }
            }
            else{

                var wu = new mongo.category({
                    name: req.body.name,
                    description: req.body.description
                });
        
                wu.save();
            }
        });
        // if(category){
            
        // }
        // else{
        //     var wu = new mongo.category({
        //         name: req.body.name,
        //         description: req.body.description
        //     });
    
        //     wu.save();
        // }
        

        res.json({ "msg": "OK!" })
    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.category.findById(id, (err, doc) => {
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
        console.log(id);
        mongo.category.findById(id, (err, doc) => {
            console.log(err);
            if (!err) {
                console.log(doc);
                console.log(req.body.name);
                console.log(req.body.description);
                doc.name = req.body.name != null ? req.body.name : doc.name;
                doc.description = req.body.description != null ? req.body.description : doc.description;

                doc.save();
                res.json({ "msg": "Updated!" });
            }
        })
    },
    getbyname : (name,isdeleted) => {
        return mongo.category.findOne({name:name,isdeleted:isdeleted});
    }
}


module.exports = {
    categorymanager
}