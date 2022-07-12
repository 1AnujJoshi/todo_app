const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server', err);
  }
  console.log('Yup!My Server is running on Port', port);
});

app.get('/', function (req, res) {
  Todo.find({}, function (err, todo) {
    if (err) {
      console.log("error in fetching Todo's from db");
      return;
    }
    return res.render('home', {
      title: 'My First ToDo App',
      todo_app: todo,
    });
  });
});

app.post('/create-todo', function (req, res) {
  Todo.create(
    {
      description: req.body.description,
      category: req.body.category,
      created_at: req.body.created_at,
    },
    function (err, newTodo) {
      if (err) {
        console.log('error in creating a Todo!');
        return;
      }

      console.log('*********', newTodo);
      return res.redirect('back');
    }
  );
});

app.get('/delete-contact/', function (req, res) {
  let id = req.query.id;

  //find the todo in the database using id and delete
  Todo.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log('error in  deleting an object from database');
    }

    return res.redirect('back');
  });
});
