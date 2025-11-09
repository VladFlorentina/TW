let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

let app = express();
let router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

const array = [
  { id: 1, name: "Ionuț", age: 25 },
  { id: 2, name: "Alex", age: 18 },
  { id: 3, name: "Mihai", age: 13 },
  { id: 4, name: "Marcel", age: 12 },
  { id: 5, name: "Marius", age: 22 },
];

router.route("/getList").get((req, res) => {
  res.json(array);
});

router.route("/getById/:id").get((req, res) => {
  const idCerut = req.params.id;
  const idNumar = parseInt(idCerut, 10);
  const resursa = array.find((item) => item.id === idNumar);
  if (resursa) {
    res.json(resursa);
  } else {
    res.status(404).json({ mesaj: "Resursa cu acest ID nu a fost găsită." });
  }
});

router.route("/postList").post((req, res) => {
  let el = req.body;
  el.id = array.length + 1;
  array.push(el);

  res.json(el);
});

let port = 8000;
app.listen(port);
console.log(`Api ruleaza pe portul ${port}`);
