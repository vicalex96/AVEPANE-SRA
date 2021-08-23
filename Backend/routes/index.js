const { Router } = require('express');
const router = Router();
const { getAlumnos,getAlumnosExt, getAlumno, createAlumno, updateAlumno,updateCorreoAlumno, deleteAlumno, getinscripciones, getinscripcion,getdocumento_faltantes, getdocumentos,insertDocumento,  getTelefonos,insertTelefono, deleteTelefono, getCarreras,getMaterias, getMateriasAlumno,insertMateria,updateMateria,eliminarMateriaCursada, getPeriodos,    getPeriodosSinMaterias, updatePeriodo, deletePeriodo, insertInscripcion,updateInscripcion,insertarDocumentoIns, eliminarDocumentoIns}= require('../controllers/funciones.controller.js')

router.get('/periodos/', getPeriodos);
router.get('/periodos-sinmaterias/', getPeriodosSinMaterias);
router.post('/periodo/', updatePeriodo);
router.post('/periodo/eliminar/', deletePeriodo);


router.get('/alumnos/', getAlumnos);
router.post('/alumnos/', getAlumnosExt);

router.get('/alumno/inscripciones/:id_alumno?/', getinscripciones);
router.get('/alumno/:id?/', getAlumno);

router.post('/alumno/registrar/', createAlumno);
router.post('/alumno/actualizar/correo/', updateCorreoAlumno);
router.post('/alumno/actualizar/', updateAlumno);
router.delete('/alumno/borrar/:id?/', deleteAlumno);
router.get('/inscripcion-actual/:id_alumno?/', getinscripcion);
router.get('/documentos/faltantes/:id_alumno?/:id_carrera?/:id_inscripcion?/', getdocumento_faltantes);
router.get('/documentos/:id_alumno?/:id_carrera?/:id_inscripcion?/', getdocumentos);
router.post('/documento-agregar/',insertarDocumentoIns );
router.post('/documento-eliminar/',eliminarDocumentoIns );
router.post('/documento/',insertDocumento);


router.post('/telefono/registrar/',insertTelefono );
router.post('/telefono/actualizar', ); // no implementado aun 
router.delete('/telefono/borrar/:id_alumno?/:id?/',deleteTelefono );
router.get('/telefonos/:id_alumno?/',getTelefonos );

router.get('/carreras', getCarreras);

router.get('/materias/carrera/:id_carrera?/',getMaterias);
router.get('/materias/alumno/:id_alumno?/:id_carrera?/:id_inscripcion?/',getMateriasAlumno);
router.post('/materia/cursada/actualizar/',updateMateria);
router.post('/materia/cursar/',insertMateria );
router.post('/materia/cursada/eliminar/', eliminarMateriaCursada);

router.post('/inscripcion/registrar/',insertInscripcion);
router.post('/inscripcion/actualizar/',updateInscripcion );







module.exports = router;