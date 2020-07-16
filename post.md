# Common form mistakes

## TLDR

## Introduccionn

Los formularios son uno de los componentes mas comunes en la web, debido a que es alli donde los usuarios  ingresan informacion que permitirá al sistema cumplir con su propósito.

A simple vista, uno podria creer que son faciles de desarrollar y mantener, pero  facilmente pueden crecer en complejidad y darnos ciertos dolores de cabeza, al punto que no queremos volver a tocar ese codigo. En este post, analizaremos un formulario y cada problema que este codigo puede generar.

Nota: para este ejercicio, no se usaran frameworks como React o Vue, pero los conceptos son independientes del framework.

Para validar que el formulario funciona correctamente, usaremos `jest` y `testing-library`. Nos enfocaremos solo en 2 casos: formulario enviado correctamente; y errores devueltos por el servicio.

Clonar el repositorio desde el siguiente link https://github.com/baldore/common-form-mistakes para ir trabajando el ejercicio.
