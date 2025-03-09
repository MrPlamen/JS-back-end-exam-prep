import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body; // destructuring incoming userData variable

    const token = await authService.login(email, password);

    res.cookie('auth', token);
    res.redirect('/');
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', (req, res) => {
    const userData = req.body;

    authService.register(userData);

    res.redirect('/auth/login');
});

export default authController;