---
name: create-java-entity
description: 'Crea una entity Java con la forma exacta indicada por el usuario o por un ejemplo cercano del repositorio. Usar para scaffolding preciso de clases de dominio o persistence, no para implementar un caso de uso completo.'
argument-hint: 'Modulo o paquete destino, nombre de la entity y forma exacta esperada: campos, anotaciones, constructores y convenciones'
---

# Create Java Entity

## When to Use

- Cuando quieres crear una entity nueva siguiendo una forma exacta.
- Cuando el valor esta en respetar convenciones concretas de campos, anotaciones, herencia, constructores o metodos.
- Cuando quieres una skill muy estrecha y facil de explicar en una formacion.

## Do Not Use

- No la uses para implementar un flujo funcional completo.
- No la uses para decidir modelo de dominio si las reglas todavia no estan claras.
- No la uses para tocar repositorios, servicios, controladores o tests salvo que el usuario lo pida explicitamente.

## Procedure

1. Resolver el modulo, paquete y nombre de la clase objetivo.
2. Leer un ejemplo cercano del repositorio si el usuario indica una entity de referencia o si existe una convencion clara en el modulo.
3. Extraer de la peticion la forma exacta esperada: anotaciones, campos, tipos, visibilidad, constructores, getters/setters, `equals`, `hashCode`, `toString` y si extiende de una base comun.
4. Si falta un detalle estructural imprescindible, pedirlo o dejar claro que no puede inventarse.
5. Crear o actualizar solo la clase objetivo respetando el estilo local del modulo.
6. No anadir logica de negocio dentro de la entity salvo que el usuario la haya pedido.

## Quality Bar

- La clase resultante debe parecer escrita por el equipo del repo.
- No inventes anotaciones JPA, validaciones o relaciones que no se hayan pedido.
- Si existe una entity parecida, replica su patron antes de improvisar otro.
- El resultado debe ser util directamente como pieza de scaffolding.

## Expected Result

- Archivo de entity creado o actualizado.
- Forma exacta alineada con la peticion del usuario.
- Resumen final con ruta, estructura aplicada y cualquier hueco no resuelto.