const express = require("express");
const app = express();
const db = require("./src/config/index");
const User = require("./src/config/index").user;

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//connect to db and create table
db.configserverdb
  .sync()
  .then(() => {
    console.log("****** tables created ! *********");
  })
  .catch((err) => {
    console.log("err", err);
  });


/* GET BY ID */
app.get("/getbyid/:id", async (req, res) => {
 
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(`err ${error}`);
  }
});
/* ADD */
app.post("/add", async (req, res) => {
  try{
    //destruction of object
    const { username, email, password } = req.body;
  return await db.user
    .create({
      username: username,
      email: email,
      password: password,
    }),
    res.status(201).send("user saved");
  }catch(error){
    res.status(500).send("server error :", err);
  }
  
  
   
});
/* GET ALL */
app.get("/getall", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(`err ${error}`);
  }
});
/* UPDATE */
app.put("/update/:id", async(req, res) => {
  
  try {
    const id = req.params.id;
    let { username, email, password } = req.body;
    const user = await User.update({
      username : req.body.username,
      email:req.body.email,
      password:req.body.password,

        },{
          where : {
            id : id
          }
        }
       )
       res.status(201).send("user updated");

  }catch(error){
     res.status(500).send("server error :", err);
  }
});

/* DELETE */
app.delete("/delete/:id", async(req, res) => {
  try{
    const id = req.params.id;
  const user = await User.destroy ( {
    where : {
      id : id
    }
  })
  res.status(200).send(`deleted ${id}`);
  }catch(error){
    res.status(500).send("server error :", err);
  }
  
  
    
  
});

app.listen(3001, () => {
  console.log("server is running on port 3000");
});
