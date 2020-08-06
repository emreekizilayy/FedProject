const { body, validationResult } = require("express-validator");

var app = require("express")();
var bodyParser = require("body-parser");
var mongo = require("./Context/mongo");
var product = require("./Business/productmanager");
var category = require("./Business/categorymanager");
var brand = require("./Business/brandmanager");
const brandmanager = require("./Business/brandmanager");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//#region product

app.post("/api/product/add",
    [
        body("name").notEmpty().trim().escape().withMessage("Ad boş geçilemez"),
        body("description"),
        body("price").notEmpty().trim().escape().withMessage("Fiyat boş geçilemez"),
        body("category").notEmpty().trim().escape().withMessage("Kategory boş geçilemez"),
        body("brand").notEmpty().trim().escape().withMessage("Marka boş geçilemez"),
        body("_id"),
        body("name").custom((value) => {
            return product.productmanager.getbyname(value).then((productt) => {
                if (productt) {
                    return Promise.reject("Ürün sistemde kayıtlı");
                }
            });
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        product.productmanager.insert(req, res);
    }
);


app.get("/api/product", (req, res) => {
    product.productmanager.get(req, res);
});

app.get("/api/product/:id", (req, res) => {
    product.productmanager.getbyid(req, res);
});

app.post("/api/product/delete",[body("id").notEmpty().trim().escape().withMessage("Id boş geçilemez")],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    product.productmanager.delete(req, res);
}
);

app.get("/api/product/category/:category", (req, res) => {
    product.productmanager.getbycategory(req, res);
});

app.get("/api/product/brand/:brand", (req, res) => {
    product.productmanager.getbybrand(req, res);
});

app.post(
    "/api/product/update",
    [body("_id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        product.productmanager.update(req, res);
    }
);

//#endregion product


//#region category

app.post("/api/category/add",
    [
        body("name").notEmpty().trim().escape().withMessage("Ad boş geçilemez"),
        body("description").notEmpty().trim().escape().withMessage("Açıklama boş geçilemez"),
        body("name").custom((value) => {
            return category.categorymanager.getbyname(value,false).then((cat) => {
                if (cat) {
                    return Promise.reject("Kategori sistemde kayıtlı");
                }
            });
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        category.categorymanager.insert(req, res);
    }
);


app.get("/api/category", (req, res) => {
    category.categorymanager.get(req, res);
});

app.get("/api/category/:id", (req, res) => {
    category.categorymanager.getbyid(req, res);
});

app.post("/api/category/delete",[body("id").notEmpty().trim().escape().withMessage("Id boş geçilemez")],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    category.categorymanager.delete(req, res);
});

app.post(
    "/api/category/update",
    [body("_id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
    [body("name").custom((value) => {
        return category.categorymanager.getbyname(value).then((cat) => {
            if (cat) {
                return Promise.reject("Kategori sistemde kayıtlı");
            }
        });
    })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        category.categorymanager.update(req, res);
    }
);

//#endregion category


//#region brand

app.post("/api/brand/add",
    [
        body("name").notEmpty().trim().escape().withMessage("Ad boş geçilemez"),
        body("description").notEmpty().trim().escape().withMessage("Açıklama boş geçilemez"),
        body("name").custom((value) => {
            return brand.brandmanager.getbyname(value,false).then((brand) => {
                if (brand) {
                    return Promise.reject("Marka sistemde kayıtlı");
                }
            });
        }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        brand.brandmanager.insert(req, res);
    }
);


app.get("/api/brand", (req, res) => {
    brand.brandmanager.get(req, res);
});

app.get("/api/brand/:id", (req, res) => {
    brand.brandmanager.getbyid(req, res);
});

app.post("/api/brand/delete",[body("id").notEmpty().trim().escape().withMessage("Id boş geçilemez")],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    brand.brandmanager.delete(req, res);
}
);

app.post(
    "/api/brand/update",
    [body("_id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
    [body("name").custom((value) => {
        return brand.brandmanager.getbyname(value).then((brand) => {
            if (brand) {
                return Promise.reject("Marka sistemde kayıtlı");
            }
        });
    })],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        brand.brandmanager.update(req, res);
    }
);

//#endregion brand

app.listen(3003);