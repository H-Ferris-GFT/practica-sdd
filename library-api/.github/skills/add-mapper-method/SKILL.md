---
name: add-mapper-method
description: 'Añade un metodo concreto a un mapper existente siguiendo el patron exacto del mapper del modulo. Usar para una transformacion puntual entre modelos, no para rediseñar la capa de mapping.'
argument-hint: 'Ruta del mapper, firma del metodo y origen/destino exactos del mapeo a añadir'
---

# Add Mapper Method

## When to Use

- Cuando solo quieres añadir un metodo de mapeo a una clase o interfaz ya existente.
- Cuando el repositorio tiene un estilo claro de mappers y quieres replicarlo sin abrir mas alcance.
- Cuando la tarea puede expresarse como una transformacion puntual y cerrada.

## Do Not Use

- No la uses para rediseñar toda la estrategia de mapeo del modulo.
- No la uses para introducir logica de negocio dentro del mapper.
- No la uses para crear automaticamente todos los artefactos relacionados del caso de uso.

## Procedure

1. Leer el mapper objetivo y detectar su patron: clase manual, interfaz, MapStruct u otro.
2. Resolver la firma exacta del metodo solicitado.
3. Añadir el nuevo metodo replicando estilo, nombres, orden y convenciones del mapper existente.
4. Si hacen falta imports o helpers ya presentes en el mapper, reutilizarlos en lugar de introducir otro patron.
5. Limitar el cambio al mapper y, como mucho, a imports estrictamente necesarios.
6. Si el usuario no define suficientemente el origen, destino o reglas de conversion, no inventarlas.

## Quality Bar

- El metodo nuevo debe integrarse sin delatar que fue añadido con otra convencion.
- No mezcles logica de negocio con transformacion estructural.
- No abras cambios colaterales en servicios o controladores.
- Si el mapper ya tiene tests cercanos y la tarea lo pide, se podra ampliar despues con otra instruccion o agente.

## Expected Result

- Metodo de mapeo añadido en el archivo correcto.
- Firma y estilo alineados con el mapper existente.
- Resumen final con ruta y limitaciones de la transformacion añadida.