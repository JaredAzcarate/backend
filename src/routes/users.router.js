import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
const router = Router();

// GET method route
router.get('/', async(req, res) => {
  try {
    let users = await userModel.find();
    res.send({ result: "success", payload: users });
  } catch (error) {
    console.log(error);
  }
});

// POST method route
router.post('/', async (req, res) => {
  let {nombre, apellido, email} = req.body

  if( !nombre || !apellido || !email ) {
    res.send({ result: "error", error: "faltan parametros" });
  }
  let result = await userModel.create({nombre, apellido, email})
  res.send({ result: "success", payload: result });
});

// PUT method route
router.put('/:uid', async(req, res) => {
    
  let {uid} = req.params
  let userToRemplace = req.body

  if(!userToRemplace.nombre || !userToRemplace.apellido || !userToRemplace.email){
    res.send({result:'Faltan parametros por completar para actualizar'})
  }

  let result = await userModel.updateOne({_id: uid}, userToRemplace)

  res.send({ result: 'success', payload: result })

});

// DELETE method route
router.delete('/:uid', async(req, res) => {

    let {uid} = req.params

    let userToDelete = req.body
  
    if(!userToDelete.nombre || !userToDelete.apellido || !userToDelete.email){
      res.send({result:'Faltan parametros por completar para actualizar'})
    }
  
    let result = await userModel.deleteOne({_id: uid})
  
    res.send({ result: 'success', payload: result })
  
});

export default router;