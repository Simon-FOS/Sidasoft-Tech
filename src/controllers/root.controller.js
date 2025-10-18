import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import * as courseService from '../modules/course/services/Course.service.js';
import * as contactService from '../modules/public/services/Contact.service.js';
import { sendContactNotification } from '../utils/email.js';

// Derive the equivalent of __dirname
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();


const page_logo = process.env.PAGELOGO

const index_view = async (req, res) => {
    try {
        const courses = await courseService.findAll({ limit: 3, offset: 0 });
        res.render('index', {
            pageTitle: "Home",
            courses: courses.courses,
            pageLogo: page_logo
        });
    } catch (err) {
        res.status(500).render('./errors/500', { message: 'Internal Server Error', error: err.message });
    }
};

const about_view = async (req, res) => {
    try {
        res.render('about', {
            pageTitle: "About",
            pageLogo: page_logo
        })
    } catch (error) {
        res.render('./errors/500', { message: "Internal Server Error" });
    }
};

const contact_view = async (req, res) => {
    try {
        res.render('contact', {
            pageTitle: "Contact",
            pageLogo: page_logo
        })
    } catch (error) {
        res.render('./errors/500', { message: "Internal Server Error" });
    }
}

const create_contact_form = async (req, res) => {
    try {
        // Handle form submission logic here
        const createContact = await contactService.create(req.body);
        // Send notification email to admin
        await sendContactNotification({
            name: createContact.first_name + ' ' + createContact.last_name,
            email: createContact.email,
            message: createContact.message,
        });
        res.status(201).json({ message: "Contact form submitted succesfully", createContact, redirectTo: '/contact' });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const privacy_policy = async (req, res) => {
    try {
        res.render('privacy-policy', {
            pageTitle: "Privacy-Policy",
            pageLogo: page_logo
        })
    } catch (error) {
        res.render('./errors/500', { message: "Internal Server Error" });
    }
}

const terms_of_service = async (req, res) => {
    try {
        res.render('terms-of-service', {
            pageTitle: "Terms-of-Service",
            pageLogo: page_logo
        })
    } catch (error) {
        res.render('./errors/500', { message: "Internal Server Error" });
    }
}
export { index_view, about_view, contact_view, privacy_policy, terms_of_service, create_contact_form };