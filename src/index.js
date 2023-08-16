const express = require("express");
const { getAll, getByGender, getByAge } = require("./services/userService");

const app = express();

app.get(["/everyone", "/"], async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch users" });
  }
});

app.get(["/male", "/female"], async (req, res) => {
  try {
    const gender = req.path.substring(1); // removing leading slash
    const users = await getByGender(gender);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: `Failed to fetch ${gender} users` });
  }
});

app.get(["/under30", "/over30"], async (req, res) => {
  const ageCondition = req.path.startsWith("/under30") ? "under" : "over";
  try {
    const users = await getByAge(ageCondition);
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: `Failed to fetch users ${ageCondition} 30` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
