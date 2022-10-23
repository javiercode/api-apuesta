import {Router} from 'express';
import {create, test, list,desactivar} from '../controllers/user.controller';

const router = Router ();
router.get('/usuario/test',test);
router.get('/usuario/list/:page/:limit',list);
router.post('/usuario/create',create);
//router.put('/usuario/edit/:id',editRolUsuario);
router.delete('/usuario/delete/:id',desactivar);

export default router;