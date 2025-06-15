const prisma = require("../db");

// cari admin berdasarkan email
const findAdminByEmail = async (email) => {
  return await prisma.admin.findUnique({
    where: { email },
  });
};

// buat admin baru (registrasi)
const createAdmin = async (adminData) => {
  return await prisma.admin.create({
    data: adminData,
  });
};

// update admin
const updateAdminById = async (id, data) => {
  return await prisma.admin.update({
    where: { id: parseInt(id) },
    data: {
      nama: data.nama,
      email: data.email,
    },
  });
};

module.exports = {
  findAdminByEmail,
  createAdmin,
  updateAdminById,
};
