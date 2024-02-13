var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "simon",
  password: "wizard301",
  database: "workout",
});

/*

Create Method

*/
async function insertOne(table_values, values) {
  let pro = new Promise((resolve, reject) => {
    let query = `INSERT INTO ${table_values} VALUES ${values};`;
    con.query(query, function (err, result) {
      if (err) throw err;
      con.commit();
      resolve(result);
    });
  });
  return pro.then((val) => {
    return val;
  });
}

/*

Find Methods

*/

async function findAll(table) {
  let pro = new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${table};`;
    con.query(query, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
  return pro.then((val) => {
    return val;
  });
}

async function findOne(table, attribute, id) {
  let pro = new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${table} WHERE ${attribute} =  ${id};`;
    con.query(query, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
  return pro.then((val) => {
    return val;
  });
}

async function findJoin(fields, table1, table2, check, attribute, id) {
  let pro = new Promise((resolve, reject) => {
    let query = `SELECT ${fields} FROM ${table1} JOIN ${table2} ON ${check} WHERE ${attribute} =  ${id};`;
    con.query(query, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
  return pro.then((val) => {
    return val;
  });
}

/*

Update Method

*/

async function updateOne(table, attributes, attribute, id) {
  let pro = new Promise((resolve, reject) => {
    let query = `UPDATE ${table} SET ${attributes} WHERE ${attribute} =  ${id};`;
    con.query(query, function (err, result) {
      if (err) throw err;
      con.commit();
      resolve(result);
    });
  });
  return pro.then((val) => {
    return val;
  });
}

/*

Delete Method

*/

async function deleteOne(table, attribute, id) {
  let pro = new Promise((resolve, reject) => {
    let query = `DELETE FROM ${table} WHERE ${attribute} =  ${id};`;
    con.query(query, function (err, result) {
      if (err) throw err;
      con.commit();
      resolve(result);
    });
  });
  return pro.then((val) => {
    return val;
  });
}

// async function doQuery(queryToDo) {
//   let pro = new Promise((resolve, reject) => {
//     let query = queryToDo;
//     con.query(query, function (err, result) {
//       if (err) throw err;
//       resolve(result);
//     });
//   });
//   return pro.then((val) => {
//     return val;
//   });
// }

// async function doQueryParams(queryToDo, array) {
//   let pro = new Promise((resolve, reject) => {
//     let query = queryToDo;
//     con.query(query, array, function (err, result) {
//       if (err) throw err;
//       resolve(result);
//     });
//   });
//   return pro.then((val) => {
//     return val;
//   });
// }

module.exports = {
  findAll: findAll,
  findOne: findOne,
  findJoin: findJoin,
  updateOne: updateOne,
  insertOne: insertOne,
  deleteOne: deleteOne,
};
