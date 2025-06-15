const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  findAdminByEmail,
  createAdmin,
  updateAdminById,
} = require("./admin.repository");
require("dotenv").config();

// generate JWT Token
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// login admin
const loginAdmin = async (email, password) => {
  const admin = await findAdminByEmail(email);
  if (!admin) throw new Error("Email tidak terdaftar");

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) throw new Error("Password salah");

  const token = generateToken(admin.id);
  return {
    token,
    admin: {
      id: admin.id,
      nama: admin.nama,
      email: admin.email,
    },
  };
};

// registrasi admin (opsional)
const registerAdmin = async (adminData) => {
  const hashedPassword = await bcrypt.hash(adminData.password, 10);
  const admin = await createAdmin({
    ...adminData,
    password: hashedPassword,
  });

  const token = generateToken(admin.id);
  return { token, admin };
};

// update admin
const updateAdmin = async (id, data) => {
  // update password harus hash dulu
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await updateAdminById(id, data);
};

// validasi email unik
const validateUniqueEmail = async (email, excludeId) => {
  const admin = await findAdminByEmail(email);
  if (admin && admin.id !== excludeId) {
    throw new Error("Email sudah digunakan");
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  updateAdmin,
  validateUniqueEmail,
};
