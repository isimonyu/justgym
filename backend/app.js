var db = require("./database.js");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

/* 

Users Endpoints

*/
// Create Users
app.post("/users", async (req, res) => {
  res.send(
    await db.insertOne(
      "Users(firstName, birthday, gender, height)",
      `("${req.body.firstName}", "${req.body.birthday}", "${req.body.gender}", "${req.body.height}")`
    )
  );
});

// RETRIEVE ALL Users
app.get("/users", async (req, res) => {
  res.send(await db.findAll("Users"));
});

// RETRIEVE User by id
app.get("/users/:_id", async (req, res) => {
  res.send(await db.findOne("Users", "user_id", `${req.params._id}`));
});

// Update User by id
app.put("/users/:_id", async (req, res) => {
  res.send(
    await db.updateOne(
      "Users",
      `firstName = '${req.body.firstName}', birthday = '${req.body.birthday}', gender = '${req.body.gender}', height = "${req.body.height}"`,
      "user_id",
      `${req.params._id}`
    )
  );
});

// Delete User by id
app.delete("/users/:_id", async (req, res) => {
  res.send(await db.deleteOne("Users", "user_id", `${req.params._id}`));
});

/* 

Equipments Endpoints

*/

// Create Equipment
app.post("/equipments", async (req, res) => {
  res.send(await db.insertOne("Equipments(name)", `("${req.body.name}")`));
});

// RETRIEVE ALL Equipment
app.get("/equipments", async (req, res) => {
  res.send(await db.findAll("Equipments"));
});

// RETRIEVE Equipment by id
app.get("/equipments/:_id", async (req, res) => {
  res.send(await db.findOne("Equipments", "equipment_id", `${req.params._id}`));
});

// Update Equipment by id
app.put("/equipments/:_id", async (req, res) => {
  res.send(
    await db.updateOne(
      "Equipments",
      `name = '${req.body.name}'`,
      "equipment_id",
      `${req.params._id}`
    )
  );
});

// Delete Equipment by id
app.delete("/equipments/:_id", async (req, res) => {
  res.send(
    await db.deleteOne("Equipments", "equipment_id", `${req.params._id}`)
  );
});

/* 

BodyParts Endpoints

*/

// Create BodyParts
app.post("/bodyparts", async (req, res) => {
  res.send(await db.insertOne("BodyParts(name)", `("${req.body.name}")`));
});

// RETRIEVE ALL BodyParts
app.get("/bodyparts", async (req, res) => {
  res.send(await db.findAll("BodyParts"));
});

// RETRIEVE BodyParts by id
app.get("/bodyparts/:_id", async (req, res) => {
  res.send(await db.findOne("BodyParts", "bp_id", `${req.params._id}`));
});

// Update BodyParts by id
app.put("/bodyparts/:_id", async (req, res) => {
  res.send(
    await db.updateOne(
      "BodyParts",
      `name = '${req.body.name}'`,
      "bp_id",
      `${req.params._id}`
    )
  );
});

// Delete BodyParts by id
app.delete("/bodyparts/:_id", async (req, res) => {
  res.send(await db.deleteOne("BodyParts", "bp_id", `${req.params._id}`));
});

/* 

DailyWeights Endpoints

*/

// Create DailyWeights
app.post("/dailyweights", async (req, res) => {
  res.send(
    await db.insertOne(
      "DailyWeights(user_id, weight, date)",
      `(${req.body.user_id}, ${req.body.weight}, "${req.body.date}")`
    )
  );
});

// RETRIEVE ALL DailyWeights
app.get("/dailyweights", async (req, res) => {
  res.send(await db.findAll("DailyWeights"));
});

// RETRIEVE DailyWeights by id
app.get("/dailyweights/:_id", async (req, res) => {
  res.send(await db.findOne("DailyWeights", "weight_id", `${req.params._id}`));
});

// RETRIEVE DailyWeights by user_id
app.get("/dailyweights/users/:_id", async (req, res) => {
  res.send(
    await db.findJoin(
      "*",
      "DailyWeights",
      "Users",
      "DailyWeights.user_id = Users.user_id",
      "DailyWeights.user_id",
      `${req.params._id}`
    )
  );
});

// Update DailyWeights by id
app.put("/dailyweights/:_id", async (req, res) => {
  res.send(
    await db.updateOne(
      "DailyWeights",
      `weight = ${req.body.weight}, user_id = ${req.body.user_id}, date = "${req.body.date}"`,
      "weight_id",
      `${req.params._id}`
    )
  );
});

// Delete DailyWeights by id
app.delete("/dailyweights/:_id", async (req, res) => {
  res.send(
    await db.deleteOne("DailyWeights", "weight_id", `${req.params._id}`)
  );
});

/* 

Exercises Endpoints

*/

// Create Exercises
app.post("/exercises", async (req, res) => {
  let attributes = `"${req.body.name}", ${req.body.equipment_id}`;
  if (req.body.notes) {
    attributes += `, "${req.body.notes}"`;
  } else {
    attributes += `, ""`;
  }
  res.send(
    await db.insertOne(
      "Exercises(name, equipment_id, notes)",
      `(${attributes})`
    )
  );
});

// RETRIEVE ALL Exercises
app.get("/exercises", async (req, res) => {
  res.send(await db.findAll("Exercises"));
});

// RETRIEVE Exercise by id
app.get("/exercises/:_id", async (req, res) => {
  res.send(await db.findOne("Exercises", "exercise_id", `${req.params._id}`));
});

// RETRIEVE Exercise by name
app.get("/exercises/name/:_name", async (req, res) => {
  res.send(await db.findOne("Exercises", "name", `'${req.params._name}'`));
});

// RETRIEVE Exercises by equipment_id
app.get("/exercises/equipments/:_id", async (req, res) => {
  res.send(
    await db.findJoin(
      "Exercises.name",
      "Exercises",
      "Equipments",
      "Exercises.equipment_id = Equipments.equipment_id",
      "Exercises.equipment_id",
      `${req.params._id}`
    )
  );
});

// Update Exercises by id
app.put("/exercises/:_id", async (req, res) => {
  let attributes = `name = "${req.body.name}", equipment_id = ${req.body.equipment_id}, notes = `;
  if (req.body.notes) {
    attributes += `"${req.body.notes}"`;
  } else {
    attributes += `""`;
  }
  res.send(
    await db.updateOne(
      "Exercises",
      attributes,
      "exercise_id",
      `${req.params._id}`
    )
  );
});

// Delete Exercises by id
app.delete("/exercises/:_id", async (req, res) => {
  res.send(await db.deleteOne("Exercises", "exercise_id", `${req.params._id}`));
});

/* 

ExerciseBodyParts Endpoints

*/

// Create ExerciseBodyParts
app.post("/ebp", async (req, res) => {
  res.send(
    await db.insertOne(
      "ExerciseBodyParts(exercise_id, bp_id)",
      `(${req.body.exercise_id}, ${req.body.bp_id})`
    )
  );
});

// RETRIEVE ALL ExerciseBodyParts
app.get("/ebp", async (req, res) => {
  res.send(await db.findAll("ExerciseBodyParts"));
});

// RETRIEVE ExerciseBodyParts by id
app.get("/ebp/:_id", async (req, res) => {
  res.send(
    await db.findOne("ExerciseBodyParts", "ebp_id", `${req.params._id}`)
  );
});

// RETRIEVE ebp_id by exercise_id and bp_id
app.get("/ebpid/:e_id/:bp_id", async (req, res) => {
  res.send(
    await db.findOne(
      "ExerciseBodyParts",
      `exercise_id = ${req.params.e_id} AND bp_id`,
      `${req.params.bp_id}`
    )
  );
});

// RETRIEVE Exercises by bp_id
app.get("/ebp/bodyparts/:_id", async (req, res) => {
  res.send(
    await db.findJoin(
      "Exercises.name",
      "ExerciseBodyParts",
      "Exercises",
      "Exercises.exercise_id = ExerciseBodyParts.exercise_id",
      "ExerciseBodyParts.bp_id",
      `${req.params._id}`
    )
  );
});

// RETRIEVE Body Parts by exercise_id
app.get("/ebp/exercises/:_id", async (req, res) => {
  res.send(
    await db.findJoin(
      "ExerciseBodyParts.ebp_id, BodyParts.name, BodyParts.bp_id",
      "ExerciseBodyParts",
      "BodyParts",
      "BodyParts.bp_id = ExerciseBodyParts.bp_id",
      "ExerciseBodyParts.exercise_id",
      `${req.params._id}`
    )
  );
});

// Update ExerciseBodyParts by id
app.put("/ebp/:_id", async (req, res) => {
  res.send(
    await db.updateOne(
      "ExerciseBodyParts",
      `exercise_id = "${req.body.exercise_id}", bp_id = ${req.body.bp_id}`,
      "ebp_id",
      `${req.params._id}`
    )
  );
});

// Delete ExerciseBodyParts by id
app.delete("/ebp/:_id", async (req, res) => {
  res.send(
    await db.deleteOne("ExerciseBodyParts", "ebp_id", `${req.params._id}`)
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
