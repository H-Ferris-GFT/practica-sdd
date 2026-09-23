package com.example.library.book;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BookServiceTest {

    private BookService bookService;

    @BeforeEach
    void setUp() {
        bookService = new BookService();
    }

    @Test
    void shouldStoreABook() {
        CreateBookRequest request = new CreateBookRequest("9780000000001", "Clean Code", "Robert C. Martin");

        Book createdBook = bookService.addBook(request);
        List<Book> storedBooks = bookService.listBooks();

        assertEquals("9780000000001", createdBook.isbn());
        assertEquals(1, storedBooks.size());
        assertEquals("Clean Code", storedBooks.get(0).titulo());
    }

    @Test
    void shouldRejectDuplicateIsbn() {
        CreateBookRequest request = new CreateBookRequest("9780000000001", "Clean Code", "Robert C. Martin");

        bookService.addBook(request);

        assertThrows(DuplicateBookException.class, () -> bookService.addBook(request));
    }
}