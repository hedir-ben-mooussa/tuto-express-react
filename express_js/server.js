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

// app.get("/welcome", (req, res) => {
 // res.status(200).send("welcome to our first backend with expressjs");
//});

app.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(`err ${error}`);
  }
});
app.get("/getall", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(`err ${error}`);
  }
});

app.put("/update/:id", async(req, res) => {
  const id = req.params.id;
  const user = await User.update({
username : 'test'
  },{
    where : {
      id : `${id}`
    }
  }
 )
 .then(() => {
  res.status(201).send("user updated");
})
.catch((err) => {
  res.status(500).send("server error :", err);
});
});

app.post("/add", async (req, res) => {
  //destruction of object
  const { username, email, password } = req.body;
  return await db.user
    .create({
      username: username,
      email: email,
      password: password,
    })
    .then(() => {
      res.status(201).send("user saved");
    })
    .catch((err) => {
      res.status(500).send("server error :", err);
    });
});

app.delete("/delete/:id", async(req, res) => {
  const id = req.params.id;
  const user = await User.destroy ( {
    where : {
      id : `${id}`
    }
  })
  .then(() => {
    res.status(200).send(`deleted ${id}`);
  })
  .catch((err) => {
    res.status(500).send("server error :", err);
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3000");
});
