# Base para proyectos Node utilizando arquitectura hexagonal

Este repositorio proporciona una base para iniciar proyectos de manera rápida utilizando la arquitectura hexagonal en Node.js. Está configurado con herramientas comunes para gestionar dependencias, errores, autenticación y más.

## Tecnologías utilizadas

- **Node.js**: JavaScript runtime para ejecutar la aplicación.
- **Express**: Framework web para crear las API REST.
- **TypeScript**: Superset de JavaScript que proporciona tipado estático.
- **bcrypt**: Para la autenticación segura de contraseñas.
- **jsonwebtoken**: Para la creación y verificación de tokens JWT.
- **node-dependency-injection**: Para la gestión de dependencias con contenedor de inyección.
- **express-rate-limit**: Para limitar la cantidad de solicitudes a la API y protegerla de ataques de denegación de servicio (DoS).
- **joi**: Para la validación de datos de entrada.
- **reflect-metadata**: Para habilitar el uso de metadatos en clases y decoradores.
- **TypeORM**: Para gestionar la base de datos.

## Contenido

- **Limitador de cantidad de solicitudes**: Implementación de un middleware para limitar el número de solicitudes a la API utilizando `express-rate-limit`.
- **Contenedor de inyección de dependencias**: Configuración de un contenedor de inyección de dependencias con `node-dependency-injection` para gestionar y resolver las dependencias de manera eficiente.
- **Manejador de errores global**: Configuración de un manejador de errores centralizado para capturar y manejar errores de manera consistente en toda la aplicación.
- **Autenticación de usuarios**: Implementación de lógica para la autenticación de usuarios utilizando `jsonwebtoken` (JWT) y `bcrypt`.
- **Validación de datos**: Uso de `joi` para validar los datos de entrada en las solicitudes HTTP.
- **ORM con TypeORM**: Configuración de `typeorm` para gestionar la base de datos MySQL con migraciones y repositorios.
- **Middleware para manejo de peticiones asíncronas**: Integración de `express-async-handler` para simplificar el manejo de errores en funciones asíncronas.
- **Formato de commits estandarizado**: Uso de `commitizen` y `commitlint` para mantener un formato de commits consistente.
- **Linting y formateo de código**: Configuración de `ESLint` junto con `@typescript-eslint` para mejorar la calidad del código.
- **Hooks pre-commit**: Implementación de `husky` para ejecutar validaciones automáticas antes de confirmar cambios en el repositorio.
- **Testing con Jest**: Configuración de `jest` y `ts-jest` para realizar pruebas unitarias en la aplicación.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/AdrianCM21/base_arquitectura_hexagonal.git
   cd hexagonal-architecture-base
   ```

2. **Instalar dependencias:**
   Si usas `npm`:

   ```bash
   npm install
   ```

   O si prefieres `yarn`:

   ```bash
   yarn install
   ```

3. **Configuración de variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

   ```
   PORT=3333
   JWT_SECRET=tu-secreto
   JWT_EXPIRATION_TIME=1h
   DB_HOST=localhost
   DB_USER=usuario
   DB_PASSWORD=contraseña
   DB_NAME=base_de_datos
   ```

4. **Ejecuta las migraciones:**

   ```bash
   npm run migrate
   ```

## Estructura del proyecto

La estructura del proyecto sigue el patrón de arquitectura hexagonal y está organizada de la siguiente manera:

- **`contexts/`**: Contiene los diferentes dominios de la aplicación. Cada dominio tiene su propia estructura de carpetas con la lógica de aplicación, el modelo de dominio y la infraestructura (por ejemplo, bases de datos, servicios externos).
- **`server.ts`**: Punto de entrada de la aplicación, donde se configura y arranca el servidor Express.
- **`config/`**: Archivos de configuración del proyecto.
- **`dependency-injection/`**: Configuración del contenedor de dependencias.

## Comandos útiles

- **Desarrollar localmente con hot-reload**:

  ```bash
  npm run dev
  ```

  O si usas `yarn`:

  ```bash
  yarn dev
  ```

- **Construir la aplicación**:

  ```bash
  npm run build
  ```

  O si usas `yarn`:

  ```bash
  yarn build
  ```

- **Ejecutar los tests**:

  ```bash
  npm run test
  ```

  O si usas `yarn`:

  ```bash
  yarn test
  ```

## Contribuciones

Si quieres contribuir a este proyecto, por favor sigue estos pasos:

1. Fork el repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza un commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Envía un Pull Request.
