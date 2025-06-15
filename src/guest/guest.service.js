const prisma = require("../db");
const {
  findGuests,
  findGuest,
  insertGuest,
  findAllPejabat,
  findPejabat,
  insertPejabat,
  updateGuestStatus,
} = require("./guest.repository");

const getAllGuests = async () => {
  const guests = await findGuests();
  return guests;
};

const getGuestById = async (id) => {
  const guest = await findGuest(id);
  return guest;
};

const addGuest = async (newGuest) => {
  try {
    const guest = await insertGuest(newGuest);

    const pejabat = await prisma.pejabat.findUnique({
      where: { id: guest.pejabatId },
    });

    if (!pejabat) {
      throw new Error(`Pejabat dengan ID ${guest.pejabatId} tidak ditemukan`);
    }

    const notifikasi = await prisma.notifikasi.create({
      data: {
        pesan: `Tamu baru: ${guest.nama} (${guest.instansi}) - ${guest.tujuan}`,
        pejabatId: guest.pejabatId,
        guestId: guest.id,
      },
    });

    return {
      ...guest,
      notifikasiId: notifikasi.id,
    };
  } catch (error) {
    console.error("Error di addGuest:", error);
    throw new Error(`Gagal menambahkan tamu: ${error.message}`);
  }
};

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

const ALLOWED_STATUSES = ["MENUNGGU", "DITERIMA", "DITOLAK", "SELESAI"];

const updateStatus = async (guestId, status, adminId) => {
  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error(
      `Status tidak valid. Gunakan: ${ALLOWED_STATUSES.join(", ")}`
    );
  }

  // cek apakah guest ada
  const guest = await findGuest(guestId);
  if (!guest) throw new Error("Tamu tidak ditemukan!");

  return await updateGuestStatus(guestId, status, adminId);
};

module.exports = {
  getAllGuests,
  getGuestById,
  addGuest,
  getAllPejabat,
  getPejabatById,
  addPejabat,
  updateStatus,
};
