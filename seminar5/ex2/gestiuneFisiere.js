const fs = require("fs");
const path = require("path");
const { rimrafSync } = require("rimraf");

const dirName = "testDir";
const filePath = path.join(dirName, "mesaj.txt");

try {
  if (!fs.existsSync(dirName)) {
    console.log(`1. Se creează directorul: ${dirName}`);
    fs.mkdirSync(dirName);
    console.log("   -> Director creat.");
  }

  console.log(`2. Se scrie în fișierul: ${filePath}`);
  fs.writeFileSync(filePath, "Salut din Node.js!");
  console.log("   -> Fișier scris.");
} catch (err) {
  console.error("A apărut o eroare la creare:", err);
} finally {
  try {
    if (fs.existsSync(dirName)) {
      console.log(`3. Se șterge directorul: ${dirName}`);
      rimrafSync(dirName);
      console.log("   -> Director șters.");
    }
  } catch (err) {
    console.error("A apărut o eroare la ștergere:", err);
  }
}
