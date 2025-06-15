const {
  loginAdmin,
  registerAdmin,
  validateUniqueEmail,
  updateAdmin,
} = require("./admin.service");

// POST: autentikasi login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginAdmin(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// POST: registrasi admin baru
const register = async (req, res) => {
  try {
    const result = await registerAdmin(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT: update data admin
const updateAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password } = req.body;

    // validasi email
    if (email) {
      await validateUniqueEmail(email, parseInt(id));
    }

    const updatedAdmin = await updateAdmin(id, { nama, email, password });

    res.json({
      success: true,
      data: {
        id: updatedAdmin.id,
        nama: updatedAdmin.nama,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  updateAdminProfile,
};
