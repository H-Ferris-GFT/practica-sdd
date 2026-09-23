package com.example.library.book;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import com.example.library.api.GlobalExceptionHandler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BookController.class)
@Import(GlobalExceptionHandler.class)
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    void shouldCreateBook() throws Exception {
        when(bookService.addBook(new CreateBookRequest("9780000000001", "Clean Code", "Robert C. Martin")))
                .thenReturn(new Book("9780000000001", "Clean Code", "Robert C. Martin"));

        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "isbn": "9780000000001",
                                  "titulo": "Clean Code",
                                  "autor": "Robert C. Martin"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.isbn").value("9780000000001"))
                .andExpect(jsonPath("$.titulo").value("Clean Code"))
                .andExpect(jsonPath("$.autor").value("Robert C. Martin"));
    }

    @Test
    void shouldListBooks() throws Exception {
        when(bookService.listBooks()).thenReturn(List.of(
                new Book("9780000000001", "Clean Code", "Robert C. Martin"),
                new Book("9780000000002", "Refactoring", "Martin Fowler")
        ));

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].isbn").value("9780000000001"))
                .andExpect(jsonPath("$[1].isbn").value("9780000000002"));
    }

    @Test
    void shouldRejectInvalidBookPayload() throws Exception {
        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "isbn": "9780000000001",
                                  "titulo": "",
                                  "autor": "Robert C. Martin"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("El campo 'titulo' es obligatorio"));
    }

    @Test
    void shouldRejectDuplicateBook() throws Exception {
        when(bookService.addBook(new CreateBookRequest("9780000000001", "Clean Code", "Robert C. Martin")))
                .thenThrow(new DuplicateBookException("9780000000001"));

        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "isbn": "9780000000001",
                                  "titulo": "Clean Code",
                                  "autor": "Robert C. Martin"
                                }
                                """))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Ya existe un libro registrado con el isbn '9780000000001'"));
    }
}