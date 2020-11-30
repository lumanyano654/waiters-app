let express = require('express');
let app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const waitersAppFact = require("./waiters");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://lumanyano:sanelisiwe@localhost:5432/waitersApp";

const pool = new Pool({
  connectionString,
});

process.env.PORT;
process.env.DATABASE_URL;

let waitersInst = waitersAppFact(pool)

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());

  app.use(
    session({
      secret: "<add a secret string here>",
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(flash());


app.get("/", async function(req, res){
  res.render("waiters");
});

app.post("/waiters", async function (req, res){
 
  res.render("waiters")
})

 app.post("/waiters/:username", async function(req, res){
  
  var insertedName = req.params.username
  console.log(insertedName)
  insertedUserName = await waitersInst.insertUserName(insertedName);
 
  
   res.render("waiters",{
     waiterName: insertedName
   })
 })

app.get("/waiters/:username",async function(req, res){
 var insertedName = req.params.username
 const showDays = await waitersInst.getdays()
 console.log(showDays)

  res.render("waiters",{
    waiterName : insertedName,
    waitersDays : showDays
  })
})



let PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});