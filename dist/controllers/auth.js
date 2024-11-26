"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
// Simulated users database
const users = [
    { user_id: 0, user_name: 'admin', user_password: bcrypt.hashSync('1234', 10), user_role: 'admin' },
    { user_id: 1, user_name: 'user', user_password: bcrypt.hashSync('1234', 10), user_role: 'user' }
];
// Login controller function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, user_password } = req.body;
        // Validate input
        if (!user_name || !user_password) {
            return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios.' });
        }
        // Find user by username
        const user = users.find(u => u.user_name === user_name);
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // Validate password
        const validPassword = yield bcrypt.compare(user_password, user.user_password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // Generate JWT token
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            console.error('SECRET_KEY no está definido en las variables de entorno.');
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        const token = jwt.sign({
            id: user.user_id,
            name: user.user_name, // Incluir nombre
            role: user.user_role, // Incluir rol
        }, secretKey, { expiresIn: '1h' });
        // Send response
        return res.json({
            auth: true,
            token: token,
            user: {
                id: user.user_id,
                name: user.user_name,
                role: user.user_role
            }
        });
    }
    catch (err) {
        console.error('Error en el controlador de login:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.login = login;
