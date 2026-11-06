# SplitFlap

Panel de paletas de aeropuerto: cada carácter gira por el abecedario hasta su letra, en cascada de izquierda a derecha. Para el dato que cambia y quieres que se note: próxima clase, puerta, marcador, turno, cuenta atrás.

- **Props**: `value` (texto; se pasa a mayúsculas), `length` (celdas fijas), `size` (`s` · `m` · `l`), `tone` (`sol` · `rams` · `verde` · `rec`: el estado, no la decoración), `cycle` (lista de valores que rota sola) + `interval` (4000 ms), `speed` (ms por paso, 45).
- Con `cycle`, se para mientras el puntero o el foco están encima. Se anuncia solo el valor final. Con movimiento reducido cambia sin girar y no rota.
- Para varias filas, `FlapBoard`. Un dato por panel: si todo gira, nada destaca.
