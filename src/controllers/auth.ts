import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express'; // Usar tipos explícitos si estás trabajando con Express

// Interface for User data
interface User {
    user_id: number;
    user_name: string;
    user_password: string; // Hashed password
    user_role: string;
}

// Simulated users database
const users: User[] = [
    { user_id: 0, user_name: 'admin', user_password: bcrypt.hashSync('1234', 10), user_role: 'admin' },
    { user_id: 1, user_name: 'user', user_password: bcrypt.hashSync('1234', 10), user_role: 'user' }
];

// Login controller function
const login = async (req: Request, res: Response) => {
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
        const validPassword = await bcrypt.compare(user_password, user.user_password);

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
            name: user.user_name,        // Incluir nombre
            role: user.user_role,        // Incluir rol
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
    } catch (err) {
        console.error('Error en el controlador de login:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export { login };