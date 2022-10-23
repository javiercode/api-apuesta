import {Router} from 'express';
import {listRoles, listUsuario, createRolUsuario, editRolUsuario, deleteRolUsuario, sucursalList, test} from '../controllers/rolusuario.controller';

const router = Router();

router.get('/rolusuario/test',test);
router.get('/rolusuario/list/:page/:limit',listUsuario);
router.post('/rolusuario/create',createRolUsuario);
router.put('/rolusuario/edit/:id',editRolUsuario);
router.delete('/rolusuario/delete/:id',deleteRolUsuario);

router.get('/sucursal/list',sucursalList);
router.get('/rol/list',listRoles);
export default router;