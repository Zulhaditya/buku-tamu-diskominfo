const prisma = require("../db");

const findAllPejabat = async () => {
  const dataPejabat = await prisma.pejabat.findMany();

  return dataPejabat;
};

const findPejabat = async (id) => {
  const dataPejabat = await prisma.pejabat.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return dataPejabat;
};

const insertPejabat = async (dataPejabat) => {
  const pejabat = await prisma.pejabat.create({
    data: {
      nama: dataPejabat.nama,
      jabatan: dataPejabat.jabatan,
      email: dataPejabat.email,
      noTelepon: dataPejabat.noTelepon,
    },
  });

  return pejabat;
};

const editPejabat = async (id, dataPejabat) => {
  const pejabat = await prisma.pejabat.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nama: dataPejabat.nama,
      jabatan: dataPejabat.jabatan,
      email: dataPejabat.email,
      noTelepon: dataPejabat.noTelepon,
    },
  });

  return pejabat;
};

const editPejabatPartial = async (id, dataPejabat) => {
  const pejabat = await prisma.pejabat.update({
    where: { id: parseInt(id) },
    data: {
      ...(dataPejabat.nama && { nama: dataPejabat.nama }),
      ...(dataPejabat.jabatan && { jabatan: dataPejabat.jabatan }),
      ...(dataPejabat.email && { email: dataPejabat.email }),
      ...(dataPejabat.noTelepon && { noTelepon: dataPejabat.noTelepon }),
    },
  });

  return pejabat;
};

module.exports = {
  findAllPejabat,
  findPejabat,
  insertPejabat,
  editPejabat,
  editPejabatPartial,
};
