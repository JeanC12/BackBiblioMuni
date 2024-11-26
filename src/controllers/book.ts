import { Request, Response } from 'express';
import Book from "../models/book";



export const getBooks = async (req: Request, res: Response) => {
    const listBooks = await Book.findAll();
    res.json(listBooks);
}

export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({
            msg: `No existe un book con el id ${id}`
        })
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
        res.status(404).json({
            msg: `No existe un book con el id ${id}`
        })
    } else {
        await book.destroy();
        res.json({
            msg: 'El book fue eliminado con exito'
        });
    }
}

export const postBook = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Book.create(body);
        res.json({
            msg: `El book fue agregado con exito`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrió un error`
        });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        if (Book) {
            await Book.update(body, {
                where: { id: id }
            });
            res.json({
                msg: `Los datos del Book fueron actualizados con exito`
            })
        } else {
            res.status(404).json({
                msg: {
                    msg: `No existe un Book con el id ${id}`
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

export const lendBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (book) {
            if (book.stock > 0) {
                book.stock -= 1; // Restamos uno al stock
                await book.save(); // Guardamos el libro con el stock actualizado
                res.json({
                    msg: `El préstamo del libro con id ${id} fue realizado con éxito.`,
                    stock: book.stock
                });
            } else {
                res.status(400).json({ msg: "No hay suficiente stock para realizar el préstamo." });
            }
        } else {
            res.status(404).json({ msg: `No existe un libro con el id ${id}` });
        }
    } catch (error) {
        res.status(500).json({ msg: "Ocurrió un error al realizar el préstamo." });
    }
};
