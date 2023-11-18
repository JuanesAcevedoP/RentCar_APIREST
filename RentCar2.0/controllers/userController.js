const User = require('../models/user');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUser: async (req, res) => {
        const { username, name, password, role, reservword } = req.body;

        if (!username || !name || !password || !role || !reservword) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }

            const newUser = new User({
                username,
                name,
                password,
                role,
                reservword,
            });

            const savedUser = await newUser.save();
            res.json(savedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id;
        const updates = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id;

        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = UserController;
