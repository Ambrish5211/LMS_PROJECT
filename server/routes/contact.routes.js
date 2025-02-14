import express from 'express';
const router = express.Router();


import contact from '../controllers/contact.controller.js';

router.post('/contact', contact);


export default router;