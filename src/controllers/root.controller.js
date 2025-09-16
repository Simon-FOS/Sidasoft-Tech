import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';

// Derive the equivalent of __dirname
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();


const page_logo = process.env.PAGELOGO

const index_view = async (req, res) => {
    try {


        //console.log(result.rows)
        res.render('index', {
            pageTitle: "Home",
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
export { index_view, about_view, contact_view, privacy_policy, terms_of_service }