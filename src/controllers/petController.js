const Pet = require('../models/petModel');
const User = require('../models/userModel');



async function assignOwnerToPet(req, res) {
    try {

        const { ownerId, petId } = req.body;

        const pet = await Pet.findById(petId);


        if (!pet) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        const owner = await User.findById(ownerId);

        if (!owner) {
            return res.status(404).json({ message: 'Usuario/propietario no encontrada' });
        }

        owner.pets.push(petId);

        await owner.save();

        console.log(owner);

        res.status(200).json({ message: 'asignada exitosamente', pet });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar la categoría', error: error.message });
    }
}



async function createPet(req, res) {
    try {
        const { name, description, owner } = req.body;

        const userExists = await User.findById(owner);

        if (!userExists) {
            return res.status(404).json({ message: 'Usuario propietario no encontrado' });
        }

        const newPet = new Pet({
            name,
            description,
            owner
        });

        const savedPet = await newPet.save();

        userExists.pets.push(savedPet._id);

        await userExists.save();

        res.status(201).json({ message: 'Mascota creada exitosamente', pet: newPet });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la mascota', error: error.message });
    }
}


async function getAllPets(req, res) {
    try {
        const pets = await Pet.find();
        res.status(200).json({ message: 'Mascotas recuperadas exitosamente', pets });
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar las mascotas', error: error.message });
    }
}

async function getPetById(req, res) {
    try {
        const { id } = req.params;
        const pet = await Pet.findById(id).populate('owner', 'name').populate('categories', 'name');
        if (!pet) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota encontrada', pet });
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar la mascota', error: error.message });
    }
}

async function updatePet(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const petUpdated = await Pet.findByIdAndUpdate(id, updateData, { new: true });
        if (!petUpdated) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota actualizada exitosamente', pet: petUpdated });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la mascota', error: error.message });
    }
}

async function deletePet(req, res) {
    try {
        const { id } = req.params;
        const petDeleted = await Pet.findByIdAndDelete(id);
        if (!petDeleted) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la mascota', error: error.message });
    }
}

module.exports = {
    createPet,
    getAllPets,
    getPetById,
    updatePet,
    deletePet,
    assignOwnerToPet
};
