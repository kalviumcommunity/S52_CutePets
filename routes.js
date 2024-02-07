const express = require("express");
const router = express.Router();

router.post("/items", (req, res) => {
  res.status(201).send("Item Posted");
});

router.get("/items", (req, res) => {
  res.status(200).send({ breed: "Dog" });
});

router.put("/items/:id", (req, res) => {
  res.status(201).send("Item Updated");
});

router.delete("/items/:id", (req, res) => {
  res.status(200).send("Item Deleted");
});

module.exports = router;
