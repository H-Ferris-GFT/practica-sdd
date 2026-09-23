---
name: create-contract-dto
description: 'Crea un DTO o contract class con la forma exacta indicada por el usuario o por los contratos existentes del modulo. Usar para scaffolding de entrada o salida, no para implementar endpoints completos.'
argument-hint: 'Modulo o paquete destino, nombre del DTO y forma exacta esperada: campos, anotaciones, serializacion y constructores'
---

# Create Contract DTO

## When to Use

- Cuando necesitas un request o response DTO con estructura fija.
- Cuando quieres copiar el estilo exacto de los contratos existentes de un modulo.
- Cuando la tarea real es solo crear la clase y no el endpoint entero.

## Do Not Use

- No la uses para implementar un controlador o un servicio completo.
- No la uses para decidir por tu cuenta el contrato si el usuario no lo ha definido.
- No la uses para mapear automaticamente el DTO con entities u otros modelos salvo que se pida.

## Procedure

1. Resolver el paquete y nombre de la clase destino.
2. Revisar un DTO o contract cercano si el modulo ya tiene un patron claro.
3. Aplicar exactamente la estructura pedida: campos, tipos, nullability, anotaciones, nombres JSON y constructores.
4. Mantener el estilo del repositorio para imports, orden de miembros y utilidades como Lombok o builders si ya se usan.
5. Crear o actualizar solo el DTO objetivo.
6. No anadir validaciones, metodos auxiliares o mapeos si no forman parte de la peticion.

## Quality Bar

- El DTO debe ser mecanico y predecible.
- No inventes campos ni defaults.
- Respeta el contrato exacto que el usuario describe.
- Si el repositorio tiene patron dominante, siguelo.

## Expected Result

- DTO creado o actualizado.
- Estructura coherente con el modulo destino.
- Resumen final con ruta y decisiones estructurales aplicadas.