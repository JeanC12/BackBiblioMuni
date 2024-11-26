import {Request, Response} from 'express';
import User from '../models/user';
export const getUsers = async (req: Request, res: Response)=>{
    const listUsers = await User.findAll();
    res.json(listUsers);
}

export const getUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({
            msg: `No existe usuario con el id ${id}`
        });
    }
}

export const deleteUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(!user){
        res.status(404).json({
            msg: `No existe usuario con el id ${id}`
        });
    }
}

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await User.create(body);
        res.json({
            msg: `El user fue agregado con exito`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrió un error`
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        if (User) {
            await User.update(body, {
                where: { id: id }
            });
            res.json({
                msg: `Los datos del User fueron actualizados con exito`
            })
        } else {
            res.status(404).json({
                msg: {
                    msg: `No existe un User con el id ${id}`
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrió un error`
        });
    }
}