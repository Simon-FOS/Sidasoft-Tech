import { Router } from "express";
import {
    index_view,
    about_view,
    contact_view,
    terms_of_service,
    privacy_policy
} from "../controllers/root.controller.js";
import { dashboard_view } from "../controllers/admin.controller.js";

const router = Router();

// Home Route
router.get('/', index_view);
router.get('/about', about_view);
router.get('/contact', contact_view)
router.get('/privacy-policy', privacy_policy)
router.get('/terms-of-service', terms_of_service)
router.get('/admin', dashboard_view)


export default router;