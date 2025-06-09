const prisma = require("../db");

const findGuests = async () => {
  const guests = await prisma.guest.findMany();

  return guests;
}

module.exports = {
  findGuests,
}
