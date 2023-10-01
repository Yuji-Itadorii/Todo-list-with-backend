const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Todo = require("./models/todo");

const app = express();

const secret = "jws_secret";

connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

// register user

app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashPassword,
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      secret,
      { expiresIn: 3600 }
    );

    res.cookie("token", token);
    res.status(200).json({ id: savedUser._id, email: savedUser.email });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("An error occurred during registration.");
  }
});

// login user

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.sendStatus(404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.sendStatus(404);
  }

  jwt.sign(
    { id: user._id, email: user.email },
    secret,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.cookie("token", token).json({ id: user._id, email: user.email });
        res.sendStatus(200);
      }
    }
  );
});

//logout

app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

// get user

app.get("/api/user", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(null);
    }

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({});
    }

    res.json({ id: user._id, email: user.email });
  } catch (error) {
    console.error(error);
    res.json(null);
  }
});

// get todos

app.post("/api/alltodos", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.json(null);
    }
    const decoded = jwt.verify(token, secret);

    const todos = await Todo.find({ user: decoded.id });

    res.json(todos);
  } catch (error) {
    console.error(error);
    res.json(null);
  }
});

// add todo

app.post("/api/todos", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.json(null);
    }
    const decoded = jwt.verify(token, secret);

    const todo = new Todo({
      text: req.body.text,
      done: false,
      user: decoded.id,
    });

    const savedTodo = await todo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.json(null);
  }
});

// delete todo

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.json(null);
    }
    const decoded = jwt.verify(token, secret);

    // const todo = await Todo.findOne({ _id: req.params.id, user: decoded.id });

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: decoded.id,
    });

    if (!todo) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// update todo

app.put("/api/todos/:id", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.json(null);
    }
    const decoded = jwt.verify(token, secret);

    const todo = await Todo.findOne({ _id: req.params.id, user: decoded.id });

    if (!todo) {
      return res.sendStatus(404);
    }

    todo.text = req.body.text;
    todo.done = req.body.done;

    const savedTodo = await todo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log("Starting http://localhost:3000");
});
