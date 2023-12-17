import express from 'express';
const router = express.Router();
const app = express()

import contact from '../controllers/contact.controller.js';

router.post('/contact', contact);


export default router;