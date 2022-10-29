import {Router} from 'express';
import RolUserController from '../controllers/rolusuario.controller';

const router = Router();

router.get('/roluser/test',RolUserController.test);
router.get('/roluser/list/:page/:limit',RolUserController.listUsuario);
router.post('/roluser/create',RolUserController.createRolUsuario);
router.put('/roluser/edit/:id',RolUserController.editRolUsuario);
router.delete('/roluser/delete/:id',RolUserController.deleteRolUsuario);

export default router;