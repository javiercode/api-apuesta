import {Router} from 'express';
import RolUserController from '../controllers/rolusuario.controller';

const router = Router();

router.get('/rolusuario/test',RolUserController.test);
router.get('/rolusuario/list/:page/:limit',RolUserController.listUsuario);
router.post('/rolusuario/create',RolUserController.createRolUsuario);
router.put('/rolusuario/edit/:id',RolUserController.editRolUsuario);
router.delete('/rolusuario/delete/:id',RolUserController.deleteRolUsuario);

router.get('/sucursal/list',RolUserController.sucursalList);
router.get('/rol/list',RolUserController.listRoles);
export default router;