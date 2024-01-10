const db = require("../../db");

const getAllPets = async () => {
  const result = await db.query("SELECT * FROM pets");
  return result.rows;
};

const getPetById = async (id) => {
  const result = await db.query("SELECT * FROM pets WHERE id = $1", [id]);
  return result.rows[0];
};

const createPet = async (petData) => {
  const { name, age, type, breed, has_microchip } = petData;
  const result = await db.query(
    "INSERT INTO pets (name, age, type, breed, has_microchip) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, age, type, breed, has_microchip]
  );
  return result.rows[0];
};

const updatePet = async (id, petData) => {
  const { name, age, type, breed, has_microchip } = petData;
  const result = await db.query(
    "UPDATE pets SET name=$2, age=$3, type=$4, breed=$5, has_microchip=$6 WHERE id = $1 RETURNING *",
    [id, name, age, type, breed, has_microchip]
  );
  return result.rows[0];
};

const deletePet = async (id) => {
  const result = await db.query("DELETE FROM pets WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet };