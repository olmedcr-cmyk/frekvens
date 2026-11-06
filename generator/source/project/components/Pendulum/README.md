# Pendulum

Metrónomo: brazo `ink` con contrapeso `rams` que oscila a los BPM indicados, y los tiempos del compás en puntos (el primero marcado con aro). Ajuste de BPM con `Stepper`.

- **Props**: `bpm`/`defaultBpm` (90), `onBpmChange(n)`, `beats` (4), `step` (5), `running` (si se controla desde fuera, desaparece la tecla de parar).
- La oscilación es seno (ease-in-out): frena en los extremos, como un péndulo real. Con movimiento reducido, el brazo se queda quieto y solo laten los puntos.
