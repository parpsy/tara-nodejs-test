const Datastore = require("nedb");
const db = new Datastore({
  filename: process.env.DB_FILE_NAME || "db.json",
  autoload: true,
});

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.find({}, {}, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

const getByGender = (gender) => {
  return new Promise((resolve, reject) => {
    db.find({ gender }, {}, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

const getByAge = (condition) => {
  const query =
    condition === "under" ? { age: { $lt: 30 } } : { age: { $gte: 30 } };
  return new Promise((resolve, reject) => {
    db.find(query, {}, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

module.exports = {
  getAll,
  getByGender,
  getByAge,
};
