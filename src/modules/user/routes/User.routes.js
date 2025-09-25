import express from 'express';
import * as controller from '../controllers/User.controller.js';
import useModuleViews from '../../../middlewares/moduleViews.js';
import { requireAuthOrRedirectCookie } from '../../../middlewares/auth.middleware.js';


const router = express.Router();

router.use(useModuleViews('user'));


// Public view routes
// router.get('/', controller.findAll);


router.get('/', (req, res) => {
    res.status(301).redirect('/user/dashboard');
});
router.get('/dashboard', controller.dashboard);

router.get('/:id', requireAuthOrRedirectCookie, controller.findById);
router.put('/:id', requireAuthOrRedirectCookie, controller.update);


export default router;
