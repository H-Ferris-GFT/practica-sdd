package com.example.library.book;

public class DuplicateBookException extends RuntimeException {

    public DuplicateBookException(String isbn) {
        super("Ya existe un libro registrado con el isbn '" + isbn + "'");
    }
}