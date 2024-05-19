const passport = require("passport");
const Todos = require("../db/models/todoModel");

module.exports = (app) => {

  app.get("/todos", (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({error: "Error"});
    }
  }, async (req, res) => {
    console.log("Requesting data...");
    try {
      let data = await Todos.find({user_id: req.user._id});
      res.json(data);
      console.log("Success");
    } catch(err) {
      console.log(err);
    }
  });
  
  app.post("/todos", (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("Posting!")
      return next();
    } else {
      res.json({error: "Error"});
    }
  }, async (req, res) => {
    console.log("Posting data...");
    let { description } = req.body;
    try {
      await Todos.create({
        user_id: req.user._id,
        description: description
      });
      let data = await Todos.find({user_id: req.user._id});
      res.json(data);
      console.log("Success");
    } catch(err) {
      console.log(err);
    }
  });
  
  app.put("/todos", (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({error: "Error"});
    }
  }, async (req, res) => {
    console.log("Updating data...");
    let { id } = req.body;
    let { description } = req.body;
    try {
      await Todos.findByIdAndUpdate({_id: id}, {description: description}, {new: true});
      let data = await Todos.find({user_id: req.user._id});
      res.json(data);
      console.log("Success");
    } catch(err) {
      console.log(err);
    }
  });
  
  app.delete("/todos", (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({error: "Error"});
    }
  }, async (req, res) => {
    console.log("Removing data...");
    let { id } = req.body;
    try {
      await Todos.findByIdAndRemove({_id: id});
      let data = await Todos.find({user_id: req.user._id});
      res.json(data);
      console.log("Success");
    } catch(err) {
      console.log(err);
    }
  });
}