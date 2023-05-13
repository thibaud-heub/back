const express = require("express");
const router = express.Router();
const data = require("../data/data.js");
const createError = require("http-errors");

const inputsKeys = ["id", "first", "last", "email", "company", "country", "created_at"];
const inputsPatterns = ["^[A-Z][A-Za-z-]*$", "^[A-Z][A-Za-z-]*$", "^[a-z0-9-_.]+@([a-z0-9]+\\.)+[a-z]{2,4}$", "^[A-Z][A-Za-z0-9-' ]*$", "^[A-Z][A-Za-z-' ]*$"];

/* GET users. */
router.get("/", function (req, res, next) {
    res.send(data.getUsers());
});

/* POST a new user. */
router.post("/", function (req, res, next) {
    for (let i = 1; i < inputsKeys.length - 1; i++) {
        if (req.body[inputsKeys[i]].match(inputsPatterns[i - 1]) === null) {
            next(createError(400));
            return;
        }
    }
    data.addUser(req.body);
    res.send();
});

/* PUT modification to a user. */
router.put("/", function (req, res, next) {
    for (let i = 1; i < inputsKeys.length - 1; i++) {
        if (req.body[inputsKeys[i]].match(inputsPatterns[i - 1]) === null) {
            next(createError(400));
            return;
        }
    }
    data.editUser(req.body);
    res.send();
});

/* DELETE a user. */
router.delete("/", function (req, res, next) {
    data.deleteUser(req.body.id);
    res.send();
});

module.exports = router;
