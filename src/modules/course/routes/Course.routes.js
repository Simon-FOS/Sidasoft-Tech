import express from 'express';
import useModuleViews from '../../../middlewares/moduleViews.js';
import {withPagination} from '../../../middlewares/paginations.js';
import * as controller from '../controllers/Course.controller.js';

const router = express.Router();

router.use(useModuleViews('course'));

// Public view routes
router.get('/', withPagination(10), controller.findAll);
router.get('/:id', controller.findById);

export default router;
