package com.example.library.book;

import jakarta.validation.constraints.NotBlank;

public record CreateBookRequest(
        @NotBlank(message = "El campo 'isbn' es obligatorio") String isbn,
        @NotBlank(message = "El campo 'titulo' es obligatorio") String titulo,
        @NotBlank(message = "El campo 'autor' es obligatorio") String autor
) {
}