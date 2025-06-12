const prisma = require("../db");

const getNotifikasiByPejabatId = async (id, filters = {}) => {
  return prisma.notifikasi.findMany({
    where: {
      pejabatId: parseInt(id),
      ...(filters.isDibaca !== undefined && { isDibaca: filters.isDibaca }),
    },
    include: { guest: { select: { nama: true, tujuan: true } } },
    orderBy: { createdAt: "desc" },
    take: filters.limit,
  });
};

module.exports = {
  getNotifikasiByPejabatId,
};
