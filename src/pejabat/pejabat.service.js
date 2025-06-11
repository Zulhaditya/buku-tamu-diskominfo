const {
  findAllPejabat,
  findPejabat,
  insertPejabat,
} = require("./pejabat.repository");

const getAllPejabat = async () => {
  const pejabat = await findAllPejabat();
  return pejabat;
};

const getPejabatById = async (id) => {
  const pejabat = await findPejabat(id);
  return pejabat;
};

const addPejabat = async (newPejabat) => {
  const pejabat = await insertPejabat(newPejabat);
  return pejabat;
};

module.exports = {
  getAllPejabat,
  getPejabatById,
  addPejabat,
};
