const KoaRouter = require("koa-router");
const GoogleSpreadsheet = require("google-spreadsheet");
const async = require("async");
const uuidv4 = require('uuid/v4');
const router = new KoaRouter();
const {Client} = require("pg");
const {
    host,
    port,
    user,
    database,
    password
} = require("./databaseCreds.json");
const client = new Client({
    host,
    port,
    user,
    database,
    password
});
// подключаемся к базе
client
    .connect()
    .then(() => console.log("connected"))
    .catch(err => console.error("connection error", err.stack));

const doc = new GoogleSpreadsheet("1PFB3XAaYuATTSscmRvkC9dd1_-GDLl2WuJDQ0PkO5AQ");
let sheet, sheetNumber;
let testNames = [];
router.post("/admin/addProduct", async ctx => {
    let {
        name,
        price,
        code,
        category,
        description,
        imageUrl,
        discount,
        p_screen,
        color,
        memmory,
        ram,
        graphic,
        main_camera,
        front_camera,
        os,
        battery,
        resolution,
        cpu,
        gallery,
        inStock,
        sub_category
    } = ctx.request.body;
    const firstCheckQuery = {
        name: "is-product-code-exist",
        text: "SELECT * FROM products WHERE product_code = $1",
        values: [code],
        rowMode: "array"
    };
    await client
        .query(firstCheckQuery)
        .then(async (res) => {
            if (res.rows[0]) {
                ctx.body = false;
            } else {
                const query = {
                    name: "register-user",
                    text:
                        "INSERT INTO products(product_code, name, price, category, main_pic, description, discount, screen, color, memmory, ram, graphic, main_camera, front_camera, os, battery, resolution, cpu, gallery, inStock, sub_category)" +
                        " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)",
                    values: [
                        code,
                        name,
                        price,
                        category,
                        imageUrl,
                        description,
                        discount,
                        p_screen,
                        color,
                        memmory,
                        ram,
                        graphic,
                        main_camera,
                        front_camera,
                        os,
                        battery,
                        resolution,
                        cpu,
                        gallery,
                        inStock,
                        sub_category
                    ]
                };
                await client
                    .query(query)
                    .then(() => (ctx.body = "Success"))
                    .catch(e => console.error(e.stack));
                ctx.body = "YEZ";
            }
        })
        .catch(e => console.error(e.stack));
});
router.put("/admin/updateProduct", async ctx => {
    let {
        name,
        price,
        product_code,
        category,
        description,
        main_pic,
        discount,
        screen,
        color,
        memmory,
        ram,
        graphic,
        main_camera,
        front_camera,
        os,
        id,
        cpu,
        battery,
        resolution,
        gallery,
        inStock,
        sub_category
    } = ctx.request.body;
    if (inStock === 'Есть в наличии' || inStock === true) {
        inStock = true;
    } else {
        inStock = false;
    }
    const query = {
        name: "update-product",
        text:
            "UPDATE products SET product_code = $1, name = $2, price = $3, category = $4, main_pic = $5, description = $6, discount = $7, screen = $8, color = $9, memmory = $10, ram = $11, graphic = $12, main_camera = $13, front_camera = $14, os = $15, cpu = $17, battery = $18, resolution = $19, gallery = $20, " +
            "inStock = $21, sub_category = $22" +
            "WHERE id = $16",
        values: [
            product_code,
            name,
            price,
            category,
            main_pic,
            description,
            discount,
            screen,
            color,
            memmory,
            ram,
            graphic,
            main_camera,
            front_camera,
            os,
            id,
            cpu,
            battery,
            resolution,
            gallery,
            inStock,
            sub_category
        ]
    };
    await client
        .query(query)
        .then(() => (ctx.body = "Success"))
        .catch(e => console.error(e.stack));
    ctx.body = "YEZ";
});
router.post("/admin/login", async ctx => {
    const session = uuidv4();
    const {name, password} = ctx.request.body;
    const query = {
        name: "fetch-user",
        text: "SELECT * FROM users WHERE name = $1 and password = $2",
        values: [name, password],
        rowMode: "array"
    };
    await client
        .query(query)
        .then(async (res) => {
            if (res.rows[0]) {
                const query_2 = {
                    name: "update-session",
                    text: "UPDATE users SET session = $1" +
                        "WHERE name = $2 and password = $3",
                    values: [session, name, password],
                    rowMode: "array"
                };
                await client
                    .query(query_2)
                    .then(() => (ctx.body = "Success"))
                    .catch(e => console.error(e.stack));
                ctx.body = {
                    session: session,
                    message: "Добро пожаловать",
                    statusCode: 200
                };
            } else {
                ctx.body = {
                    message: "Неверные данные",
                    status: "Unauthorized"
                };
            }
        })
        .catch(e => console.error(e.stack));
});
router.post("/loginCheck", async ctx => {
    const {session} = ctx.request.body;
    const query = {
        name: "check-session",
        text: "SELECT * FROM users WHERE session = $1",
        values: [session],
        rowMode: "array"
    };
    await client
        .query(query)
        .then(async (res) => {
            if (res.rows[0]) {
                ctx.body = {
                    message: "Добро пожаловать",
                    statusCode: 200
                };
            } else {
                ctx.body = {
                    message: "Неверные данные",
                    status: "Unauthorized"
                };
            }
        })
        .catch(e => console.error(e.stack));
});
router.post("/admin/deleteProduct", async ctx => {
    const {id} = ctx.request.body;
    const query = {
        name: "delete-product",
        text: "DELETE FROM products WHERE id = $1",
        values: [id]
    };
    ctx.body = await client
        .query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});
router.get("/products", async ctx => {
    ctx.body = await client
        .query("SELECT * FROM products ORDER BY price DESC")
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});
router.get("/admin/products", async ctx => {
    ctx.body = await client
        .query("SELECT * FROM products")
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});
router.get("/product/:id", async ctx => {
    const query = {
        name: "fetch-product-by-id",
        text: "SELECT * FROM products WHERE product_code = $1",
        values: [ctx.params.id]
    };
    ctx.body = await client
        .query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});
router.post("/filter", async ctx => {
    const {
        category,
        min_price,
        max_price,
        sortBy
    } = ctx.request.body;
    let text = `SELECT * FROM products WHERE category = $1 AND price BETWEEN $2 AND $3 ORDER BY price ${sortBy === 'Сначала дорогие' ? 'DESC': 'ASC'}`;
    let values = [category, min_price, max_price];
    if (category === 'Всё' || category === '') {
        text = `SELECT * FROM products WHERE (category LIKE '%') AND price BETWEEN $1 AND $2 ORDER BY price ${sortBy === 'Сначала дорогие' ? 'DESC': 'ASC'}`;
        values = [min_price, max_price]
    }
    const query = {
        text: text,
        values: values
    };
    ctx.body = await client
        .query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});
router.get("/admin/getFromGoogle/:id", async ctx => {
    try {
        sheetNumber = ctx.params.id;
        await getGoogleSheets();
    } catch (e) {
        throw Error(e);
    }
    ctx.body = await testNames;
});
router.get("/admin/promocodes", async ctx => {
    const query = {
        name: `admin-get-promocodes}`,
        text: "SELECT * FROM promocodes"
    };
    ctx.body = await client
        .query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});
router.post("/admin/promocodes", async ctx => {
    const {
        text,
        discount,
        id
    } = ctx.request.body;
    if (id) {
        const query = {
            name: `admin-delete-promocode}`,
            text: "DELETE FROM promocodes WHERE id = $1",
            values: [id]
        };
        ctx.body = await client
            .query(query)
            .then(res => res.rows)
            .catch(e => console.error(e.stack));
    } else {
        const query = {
            name: `admin-post-promocode}`,
            text: "INSERT INTO promocodes(text, discount) VALUES($1, $2)",
            values: [text, discount]
        };
        ctx.body = await client
            .query(query)
            .then(res => res.rows)
            .catch(e => console.error(e.stack));
    }
});
router.get("/promocodes", async ctx => {
    const query = {
        name: `admin-get-promocodes}`,
        text: "SELECT * FROM promocodes"
    };
    ctx.body = await client
        .query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack));
});

async function getGoogleSheets() {
    await async.series(
        [
            function setAuth(step) {
                const creds = require("./Creds.json");
                doc.useServiceAccountAuth(creds, step);
            },
            function getInfoAndWorksheets(step) {
                doc.getInfo(function (err, info) {
                    sheet = info.worksheets[sheetNumber];
                    step();
                });
            },
            function workingWithRows(step) {
                sheet.getRows(
                    function (err, rows) {
                        let names = [];
                        for (let item of rows) {
                            names.push({
                                name: item._cokwr,
                                price: item._cpzh4,
                                code: item._cn6ca
                            });
                        }
                        testNames = names;
                        step();
                    }
                );
            }
        ]
    );
}
module.exports = router;
