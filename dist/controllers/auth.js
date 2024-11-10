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
// Simulación de usuarios almacenados (consider using a secure database)
const users = [
    { user_id: 0, user_name: 'admin', user_password: bcrypt.hashSync('1234', 10), user_role: 'admin' },
];
// Función para autenticación de usuarios
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { user_name, user_password } = req.body;
    // Find user by username
    const user = users.find(u => u.user_name === user_name);
    if (!user) {
        return res.status(401).send('Credenciales inválidas'); // User not found
    }
    // Validate password using bcrypt.compare (never compare plain text passwords)
    const validPassword = yield bcrypt.compare(user_password, user.user_password); // Async operation
    if (!validPassword) {
        return res.status(401).send('Credenciales inválidas'); // Invalid password
    }
    // Generate token JWT
    const secretKey = (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : '';
    ;
    const token = jwt.sign({ id: user.user_id, role: user.user_role }, secretKey, { expiresIn: '1h' });
    return res.json({ auth: true, token: token });
});
exports.login = login;
