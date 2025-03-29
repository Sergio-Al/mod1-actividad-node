const express = require("express");
const router = express.Router();

const usuarios = require("./data");

// Obtener usuarios
router.get("/usuarios", (req, res) => {
  let filteredUsuarios = usuarios;

  if (req.query.nombre) {
    filteredUsuarios = filteredUsuarios.filter((u) =>
      u.nombre.toLowerCase().includes(req.query.nombre.toLowerCase())
    );
  }

  if (req.query.edad) {
    const edadFilter = parseInt(req.query.edad);
    filteredUsuarios = filteredUsuarios.filter((u) => u.edad === edadFilter);
  }

  if (filteredUsuarios.length === 0) {
    return res.status(404).json({
      mensaje: "No se encontraron usuarios con los parámetros de búsqueda.",
    });
  }
  res.status(200).json(filteredUsuarios);
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
