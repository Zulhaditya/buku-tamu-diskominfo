const { findGuests } = require("./guest.repository");

const getAllGuests = async () => {
  const guests = await findGuests();
  return guests;
}

module.exports = {
  getAllGuests,
}
