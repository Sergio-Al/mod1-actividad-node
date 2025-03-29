# API de usuarios

## Descripción
Proyecto de maestria para la gestion de usuarios, incluyendo funcionalidades para crear, leer, actualizar y eliminar usuarios.

## Requisitos

- [Node.js](https://nodejs.org/) 
Instalado en tu sistema.
- npm (viene con nodejs).

## Instalación

1. Instala las dependencias del proyecto
```bash
npm install
```

2. Inicia el proyecto
```bash
node server.js
```
3. Abre tu navegador y ve a `http://localhost:3000/`
   
4. Si no tienes instalado el cliente de Postman, puedes descargarlo desde [aqui](https://www.postman.com/downloads/).

5. Abre Postman y selecciona la pestaña "Importar" en la parte superior izquierda.

6. Selecciona la opción "Importar desde archivo" y selecciona el archivo `Maestria-MOD1.postman_collection.json` que se encuentra en la carpeta del proyecto.

6. Una vez importada la colección, podrás ver todas las peticiones disponibles para interactuar con la API de usuarios.

## Endpoints
| Método | Endpoint                | Descripción                          |
|--------|-------------------------|--------------------------------------|
| GET    | /api/usuarios           | Obtener todos los usuarios           |
| GET    | /api/usuarios/:id       | Obtener un usuario por ID            |
| POST   | /api/usuarios           | Crear un nuevo usuario               |
| PUT    | /api/usuarios/:id       | Actualizar un usuario por ID         |
| DELETE | /api/usuarios/:id       | Eliminar un usuario por ID           |
