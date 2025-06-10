const { findGuests, findGuest, insertGuest } = require("./guest.repository");

const getAllGuests = async () => {
  const guests = await findGuests();
  return guests;
};

const getGuestById = async (id) => {
  const guest = await findGuest(id);
  return guest;
};

const addGuest = async (newGuest) => {
  const guest = await insertGuest(newGuest);
  return guest;
}

module.exports = {
  getAllGuests,
  getGuestById,
  addGuest,
};
