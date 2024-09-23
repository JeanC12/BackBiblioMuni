"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.postBook = exports.deleteBook = exports.getBook = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listBooks = yield book_1.default.findAll();
    res.json(listBooks);
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_1.default.findByPk(id);
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).json({
            msg: `No existe un book con el id ${id}`
        });
    }
});
exports.getBook = getBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_1.default.findByPk(id);
    if (!book) {
        res.status(404).json({
            msg: `No existe un book con el id ${id}`
        });
    }
    else {
        yield book.destroy();
        res.json({
            msg: 'El book fue eliminado con exito'
        });
    }
});
exports.deleteBook = deleteBook;
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield book_1.default.create(body);
        res.json({
            msg: `El book fue agregado con exito`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrió un error`
        });
    }
});
exports.postBook = postBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const alumno = yield book_1.default.findByPk(id);
        if (book_1.default) {
            yield book_1.default.update(body, {
                where: { id: id }
            });
            res.json({
                msg: `Los datos del Book fueron actualizados con exito`
            });
        }
        else {
            res.status(404).json({
                msg: {
                    msg: `No existe un Book con el id ${id}`
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ocurrió un error`
        });
    }
});
exports.updateBook = updateBook;
