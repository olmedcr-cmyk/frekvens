# Aura

Disponible no es un puntito en la esquina: es un halo que respira alrededor de quien está. `verde` disponible, `rec` en directo (respira más rápido), `sol` ausente, `klein` la IA trabajando, `rams` ocupado. Desconectado: sin halo y en gris.

- **Props**: `status` (`online` · `available` · `live` · `away` · `busy` · `ai` · `offline`) o `tone`, `active`, `shape` (`round` · `rect`), `label` (texto para lectores), `children`.
- `Avatar` lo usa solo con `status`. Úsalo también en una tecla o una tarjeta que está lista para usarse (una sala libre, un agente conectado).
- Un halo por zona. Con movimiento reducido el halo queda fijo: el estado se sigue viendo.
