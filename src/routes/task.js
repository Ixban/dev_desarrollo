const express = require('express');
const router = express.Router();

//LLamada al modelo
const model = require('../models/model');

//Funcion para comprabar el funcionamiento de la API
router.get('/running', (req, res) => {
    res.send('Running...');;
});

//Traer Todos los registro de la base de datos
router.get('/get', async (req, res) => {
    try {
        const result = await model.find();
        res.json(result);
        //res.send('send');
    } catch (error) {
        res.send('Sucedio un error:' + error);
    }

});

//Actualizar por ID
router.put('/update/:id', async (req, res) => {
    try {

        await model.findByIdAndUpdate(req.params.id, req.body );
        res.json({
            status: 'Actualizado'
        });

    } catch (error) {
        res.send('Sucedio un error:' + error);
    }
});

//Añadir un registro
router.post('/add', async (req, res) => {
    try {

        const result = new model(req.body);
        await result.save();
        res.json({
            status: 'Guardado'
        });

    } catch (error) {
        res.send('Sucedio un error:' + error);
    }
});

//Extraer un registro por ID
router.get('/getId/:id', async (req, res) => {
    try {

        const result = await model.findById(req.params.id);
        res.json(result);

    } catch (error) {
        res.send('Sucedio un error:' + error);
    }
});


//Eliminar un registro por ID
router.delete('/:id', async (req, res) => {
    try {

        await model.findByIdAndRemove(req.params.id);
        res.json({
            status: 'Eliminado'
        });

    } catch (error) {
        res.send('Sucedio un error:' + error);
    }
});


module.exports = router;
