const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const moviesRoutes = require("./routes/movies");
const { v4: uuidv4 } = require("uuid");

const session = require("express-session");

function loggingMiddleware(req, res, next) {
  console.log("LOGGING MIDDLEWARE");
  next(); // continue with the original request
}

global.movies = [];
global.movieDetail = [];

let users = [
  {userName: "hung",
  password: "ho",}
]

app.use(express.urlencoded());


app.use(
  session({
    secret: "USEASECUREKEYHERE",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/movies",authenticate,moviesRoutes);
app.engine("mustache", mustacheExpress());

app.set("views", "./views");
app.set("view engine", "mustache");

app.listen(3000, () => {
  console.log("server is running");
});


//login page
app.get("/login", (req, res) => {
  res.render("login");
});

app.get('/',(req,res)=>{
    res.render('login')
})

app.post("/login",(req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const currentUser = users.find(user=>{
      return user.userName == username && user.password == password
  })

  if (currentUser) {
    if (req.session) {
      req.session.username = username;
      res.redirect("/movies");
    }
  } else {
    res.render("login", { message: "Username or password is not correct" });
  }
});

//Authenticate function
function authenticate(req, res, next) {
  if (req.session) {
    if (req.session.username) {
      next();
    } else {
      res.redirect("/login");
    }
  }else{
      res.redirect('/login')
  }
}


//register page

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',(req,res)=>{
    let newUser = req.body.username
    let newPass = req.body.password
    let userNew = {
        userName : newUser,
        password : newPass,
    }
    users.push(userNew)
    res.redirect('/login')
})