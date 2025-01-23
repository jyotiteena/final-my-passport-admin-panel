// const express = require('express');
// const router = express.Router()

const router = require("express").Router();

const Category = require("../controllers/category.controller");
router.post("/", Category.store);
router.get("/:id", Category.trash);
router.post("/:id", Category.update);

module.exports = router;
