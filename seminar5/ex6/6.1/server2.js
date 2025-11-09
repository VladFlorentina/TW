const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

const dateleMele = [
  { id: 1, nume: "Ana" },
  { id: 2, nume: "Bogdan" },
  { id: 3, nume: "Cristi" },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index2.html"));
});

app.get("/api/cauta/:id", (req, res) => {
  const idCautat = parseInt(req.params.id, 10);
  const rezultat = dateleMele.find((item) => item.id === idCautat);

  if (rezultat) {
    res.json(rezultat);
  } else {
    res.status(404).json({ mesaj: "Nu am gasit" });
  }
});

app.listen(port, () => {
  console.log(`Serverul ruleaza pe portul ${port}`);
});
