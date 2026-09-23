package com.example.library.book;

public record BookResponse(String isbn, String titulo, String autor) {

    public static BookResponse from(Book book) {
        return new BookResponse(book.isbn(), book.titulo(), book.autor());
    }
}