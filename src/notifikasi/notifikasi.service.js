const { getNotifikasiByPejabatId } = require("./notifikasi.repository");

const notifikasiPejabat = async (id) => {
  return getNotifikasiByPejabatId(id);
};

module.exports = {
  notifikasiPejabat,
};
