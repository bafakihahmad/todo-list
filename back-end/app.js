const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

//express app confiig
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../", "front-end", "views"));

// import todo class
const todo = require(path.join(__dirname, "../", "public", "js", "todo.js"));
// holds all todo objects
const todos = [];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../", "public")));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add-todo", (req, res, next) => {
  // Pull out work value using object destructuring from req.body object
  const { work } = req.body;
  // with each post request to the form, instantiate a new
  // todo object and push it into the todo array
  const taskTodo = new todo(work);
  // push new object into array
  todos.push(taskTodo);
  //console.log(work);
  res.redirect("/");
});

app.post("/complete-task", (req, res, next) => {
  // Access the todo index sent via the hidden input field
  const todoIndex = req.body.todoIndex;

  // Mark the corresponding todo as complete
  if (todos[todoIndex]) {
    todos[todoIndex].completeTask(); // This sets the state to true
  }

  // Redirect back to the homepage or wherever you want
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.render(path.join(__dirname, "../", "front-end", "views", "home.ejs"), {
    todos,
  });
});

app.listen(8000);
