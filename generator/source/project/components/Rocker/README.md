# Rocker

Interruptores basculantes de máquina sobre una placa `verde`: la tecla bascula al encenderse y el piloto `LED` de debajo se enciende. Para 2–4 funciones físicas paralelas (sonido, vibración, pantalla siempre encendida).

- **Props**: `items` (`[{label, icon, on, checked, tone, onChange}]`), `label` (del grupo).
- Cada tecla es un `role="switch"`; el piloto repite el estado en texto para lectores.
