import express from 'express';
import useModuleViews from '../../../middlewares/moduleViews.js';
import { withPagination } from '../../../middlewares/paginations.js';
import * as controller from '../controllers/admin.Course.controller.js';
import upload from '../../../config/multerConfig.js';
import setSection from '../../../middlewares/uploadLocation.js';

const router = express.Router();

router.use(useModuleViews('course'));

// Admin view routes
router.route('/')
  .get(withPagination(10), controller.findAll)
  .post(controller.create);

router.get('/create', controller.renderCreate);
router.post('/create',
  setSection('courses'), // Middleware to set the section for dynamic folder creation
  upload.array('image_url', 1), // Middleware to handle file upload, expecting field name 'image_url'
  controller.create);


router.route('/:id')
  .get(controller.findById)
  .put(controller.update)
  .delete(controller.destroy);

export default router;
