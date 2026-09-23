package com.example.library.book;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final ConcurrentMap<String, Book> booksByIsbn = new ConcurrentHashMap<>();

    public Book addBook(CreateBookRequest request) {
        Book book = new Book(request.isbn(), request.titulo(), request.autor());
        Book previousBook = booksByIsbn.putIfAbsent(book.isbn(), book);

        if (previousBook != null) {
            throw new DuplicateBookException(book.isbn());
        }

        return book;
    }

    public List<Book> listBooks() {
        return booksByIsbn.values().stream().toList();
    }
}