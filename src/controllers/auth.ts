import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


// Interface for User data (avoid storing passwords in plain text)
interface User {
    user_id: number;
    user_name: string;
    user_password: string; // Hashed password (store only the hash)
    user_role: string;
}

// Simulación de usuarios almacenados (consider using a secure database)
const users: User[] = [
    { user_id: 0, user_name: 'admin', user_password: bcrypt.hashSync('1234', 10), user_role: 'admin' },
];

// Función para autenticación de usuarios
const login = async (req: any, res: any) => {
    const { user_name, user_password } = req.body;

    // Find user by username
    const user = users.find(u => u.user_name === user_name);

    if (!user) {
        return res.status(401).send('Credenciales inválidas'); // User not found
    }

    // Validate password using bcrypt.compare (never compare plain text passwords)
    const validPassword = await bcrypt.compare(user_password, user.user_password); // Async operation

    if (!validPassword) {
        return res.status(401).send('Credenciales inválidas'); // Invalid password
    }

    // Generate token JWT
    const secretKey = process.env.SECRET_KEY ?? '';;
    const token = jwt.sign({ id: user.user_id, role: user.user_role }, secretKey, { expiresIn: '1h' });
    return res.json({ auth: true, token: token });
};

export { login };
