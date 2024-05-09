const express = require('express');
const { createPet, getAllPets, getPetById, updatePet, deletePet, assignOwnerToPet } = require('../controllers/petController');
const validateToken = require('../middlewares/validationToken');

const petRouter = express.Router();

// Rutas para el manejo de mascotas
petRouter.post('/api/pets', createPet);


petRouter.get('/api/pets', getAllPets);
petRouter.get('/api/pets/:id', getPetById);
petRouter.patch('/api/pets/:id', validateToken, updatePet);
petRouter.delete('/api/pets/:id', validateToken, deletePet);

petRouter.post('/api/pets/assign', assignOwnerToPet);

module.exports = petRouter;
