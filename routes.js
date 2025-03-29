const express = require("express");
const router = express.Router();

const usuarios = require("./data");

// Obtener usuarios
// con paginación y filtros
// con token de autorización
// Ejemplo: /api/usuarios?page=1&limit=5&nombre=Juan
// Authorization: Bearer token
router.get("/usuarios", (req, res) => {
  const { page = 1, limit = 5, age } = req.query;
  const token = req.headers.authorization;

  if (!token || token !== `Bearer ${process.env.AUTH_TOKEN}`) {
    return res.status(401).json({ mensaje: "Token no válido" });
  }

  let usuariosFiltrados = usuarios;

  if (age){
    usuariosFiltrados = usuariosFiltrados.filter(
      (usuario) => usuario.edad === parseInt(age)
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsuarios = usuariosFiltrados.slice(startIndex, endIndex);

  res.status(200).json({
    total: usuariosFiltrados.length,
    page: parseInt(page),
    limit: parseInt(limit),
    usuarios: paginatedUsuarios,
  });
});

// Obtener usuario
router.get("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find((u) => (u.id = parseInt(req.params.id)));
  if (!usuario) return res.status(404).send("Usuario no encontrado");
  res.status(200).json(usuario);
});

// Agregar un usuario
router.post("/usuarios", (req, res) => {
  const { nombre, edad } = req.body;
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
  };

  if (!nombre || !edad) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Modificar un usuario por id
router.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex((u) => u.id === parseInt(id));

  usuarios[index].nombre = req.body.nombre;
  usuarios[index].edad = req.body.edad;

  res.status(200).json(usuarios[index]);
});

// Eliminar un usuario por id
router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  usuarios.splice(index, 1);
  res.status(200).json({ mensaje: "Usuario eliminado" });
});

router.post("/usuarios/batch", (req, res) => {
  const nuevosUsuarios = req.body;

  if (!Array.isArray(nuevosUsuarios)) {
    return res.status(400).json({ mensaje: "Se esperaba un arreglo de usuarios" });
  }

  if (nuevosUsuarios.length === 0) {
    return res.status(400).json({ mensaje: "El arreglo de usuarios no puede estar vacío" });
  }

  const usuariosAgregados = [];
  for (const usuario of nuevosUsuarios) {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: usuario.nombre,
      edad: usuario.edad
    };
    usuarios.push(nuevoUsuario);
    usuariosAgregados.push(nuevoUsuario);
  }

  res.status(201).json(usuariosAgregados);
});

router.delete("/usuarios", (req, res) => {
  if (usuarios.length === 0) {
    return res.status(404).json({ mensaje: "No hay users para eliminar" });
  }

  usuarios.length = 0;
  res.status(200).json({ mensaje: "Todos los users han sido eliminados" });
});
module.exports = router;
