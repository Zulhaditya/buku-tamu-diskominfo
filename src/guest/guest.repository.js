const prisma = require("../db");

const findGuests = async () => {
  const guests = await prisma.guest.findMany();

  return guests;
};

const findGuest = async (id) => {
  const guest = await prisma.guest.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return guest;
};

const insertGuest = async (guestData) => {
  const guest = await prisma.guest.create({
    data: {
      nama: guestData.nama,
      email: guestData.email,
      noTelepon: guestData.noTelepon,
      instansi: guestData.instansi,
      tujuan: guestData.tujuan,
      foto: guestData.foto,
      pejabatId: guestData.pejabatId,
      adminId: guestData.adminId,
    },
  });

  return guest;
};

const findAllPejabat = async () => {
  const dataPejabat = await prisma.pejabat.findMany();

  return dataPejabat;
};

const findPejabat = async (id) => {
  const dataPejabat = await prisma.pejabat.findUnique({
    where: {
      id,
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

module.exports = {
  findGuests,
  findGuest,
  insertGuest,
  findAllPejabat,
  findPejabat,
  insertPejabat,
};
