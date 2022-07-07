# Arduino - IOTA

Pequeña implementación utilizando un **Arduino Nano 33 IOT** (aunque se puede cualquier placa arduino con conexión serial)
en el que se puede enviar y obtener mensajes encriptados (AES) del Tangle de IOTA.

## Requisitos

- Placa arduino
- Ordenador con versiones de node.js: '10.x', '12.x', '14.x', '15.x', '16.x'
- Un archivo .env predefinido con las siguientes variables (mirar .env.example):


    - `NODE`

    - `IOTA_SEED_SECRET`

    - `SERIAL_PORT_ARDUINO`

    - `INDEX_MESSAGE`


## Instalación

Para ello, instala las dependencias ejecutando:

```
npm i
```

## Despliegue

- npm run `**portscan**`: Mostrar los puertos disponibles en tu máquina
- npm run `**send**`: Ejecuta el script sendMessage.js
- npm run `**get**: Ejecuta el script getMessage.js
