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
}

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
    }
  });

  return guest;
};

module.exports = {
  findGuests,
  findGuest,
  insertGuest,
};
