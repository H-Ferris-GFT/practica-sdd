---
name: new-spec
description: 'Create a new SDD spec in sdd/specs using the skill template. Use for nueva funcionalidad, cambio funcional sin spec, o cuando una peticion necesita una spec antes de disenar o implementar.'
argument-hint: 'Describe la funcionalidad, el objetivo de negocio y, si existe, el nombre esperado de la spec'
---

# New Spec

## When to Use

- Cuando una funcionalidad nueva todavia no tiene spec.
- Cuando hay un cambio funcional relevante y no existe una spec actualizada.
- Cuando hace falta bajar un requisito a un documento SDD antes del plan tecnico.

## Canonical Sources

- `./assets/SPEC_TEMPLATE.md`
- `sdd/specs/SPEC-001-gestion-libros-biblioteca/SPEC-001-gestion-libros-biblioteca.md`
- `README.md`

## Procedure

1. Leer la plantilla y el ejemplo antes de redactar.
2. Revisar `sdd/specs/` para elegir el siguiente identificador disponible con formato `SPEC-<NNN>-<slug>`.
3. Si no existe ninguna spec, empezar por `SPEC-001-<slug>`.
4. Generar el slug en kebab-case a partir de `verbo + objeto`.
5. Crear una carpeta `sdd/specs/SPEC-<NNN>-<slug>/`.
6. Crear dentro de esa carpeta el archivo principal `sdd/specs/SPEC-<NNN>-<slug>/SPEC-<NNN>-<slug>.md` usando la estructura base de la plantilla.
7. Completar con informacion concreta disponible en la peticion del usuario.
8. Cuando falte informacion, escribir `TODO` en el punto afectado y anadirla a `## Dudas abiertas`.
9. Asegurar que cada regla de negocio tiene su consecuencia, que las precondiciones indican que pasa si fallan y que existen escenarios Gherkin minimos para happy path y rechazo por regla.
10. Si detectas que ya existe una spec equivalente, no dupliques: propone actualizar la existente.

## Quality Bar

- No dejes huecos silenciosos.
- No inventes reglas de negocio ni respuestas del sistema.
- Incluye 1-3 edge cases concretos.
- Usa lenguaje funcional y verificable.
- Deja explicito que queda dentro y fuera del alcance.

## Expected Result

- Carpeta creada en `sdd/specs/SPEC-<NNN>-<slug>/`.
- Archivo principal creado en `sdd/specs/SPEC-<NNN>-<slug>/SPEC-<NNN>-<slug>.md`.
- Nombre normalizado con numeracion secuencial.
- Seccion `## Dudas abiertas` con lo que falte por definir.
- Resumen final con ruta creada y puntos pendientes.