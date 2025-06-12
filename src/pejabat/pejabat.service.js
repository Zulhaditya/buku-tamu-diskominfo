const {
  findAllPejabat,
  findPejabat,
  insertPejabat,
  editPejabat,
  editPejabatPartial,
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

const updatePejabatById = async (id, dataPejabat) => {
  if (!dataPejabat) {
    alert("Data pejabat masih kosong");
  }

  if (
    !dataPejabat.nama ||
    !dataPejabat.jabatan ||
    !dataPejabat.email ||
    !dataPejabat.noTelepon
  ) {
    alert("Beberapa data pejabat masih kosong");
  }

  const pejabat = await editPejabat(id, dataPejabat);
  return pejabat;
};

const partialUpdatePejabatById = async (id, dataPejabat) => {
  const pejabat = await editPejabatPartial(id, dataPejabat);
  return pejabat;
};

module.exports = {
  getAllPejabat,
  getPejabatById,
  addPejabat,
  updatePejabatById,
  partialUpdatePejabatById,
};
