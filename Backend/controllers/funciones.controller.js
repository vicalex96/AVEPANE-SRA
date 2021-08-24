const DB = require("../DataBase");
pool = DB.getPool();

const getAlumnos = async(req,res,next) => {
    try {
        const response = await pool.query(`select *, COALESCE((select c.nombre from inscripcion i
            inner join carrera c on c.id = i.id_carrera 
              where id_alumno = a.id 
              order by i.id desc
              limit 1
            ),'-') as carrera from alumno a `);
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getAlumnosExt = async (req, res, next) => {
    try {
        const{
            carrera,
            cedula,
            pagina,
        } = req.body;
        let partes_nombre = nombre.split(" ");
        console.log('jojo hola')
        const response = await pool.query(`
        select a.*, c.nombre from alumno a
        left join inscripcion i on i.id_alumno = a.id
        left join carrera c on c.id = i.id_carrera
        where ( i.id in( select id from inscripcion where id_alumno = a.id order by fecha_inscripcion desc limit 1) or i.id is null)
            and i.id_carrera = c.id
            and c.nombre = COALESCE('$1',c.nombre)
        limit pagina
        OFFSET 10*pagina`,
        [
            carrera
        ]);
        console.log("hola ext");
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        console.log("hola error");
        res.status(500).send(e);
    }
}

const getAlumno = async (req,res,next)=>{
    try{  
        const id = req.query.id
        console.log('-> obteniendo informacion del alumno: ', id)
        const response = await pool.query(` SELECT * from alumno
                                            where id = $1`, 
                                        [id])
        res.status(200).json(response.rows[0])
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const createAlumno = async (req, res, next) => {
    
    try {
        const {
            cedula,
            tipo_cedula,
            nombre,
            apellido,
            fecha_nacimiento,
            genero,
            email,
            nombre2,
            apellido2

        } = req.body;
        const response = await pool.query("select nextval('sec_alumno') as id");
        let id_alumno = response.rows[0].id 
        console.log("crear registro del Alumno: ", req.body,id_alumno);

        console.log('hola');

        const response2 = await pool.query(
            "INSERT INTO alumno values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
            [
                id_alumno,
                cedula,
                tipo_cedula,
                nombre,
                apellido,
                fecha_nacimiento,
                genero,
                email,
                nombre2,
                apellido2
            ]
        );
        res.send(id_alumno);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updateAlumno =  async (req, res) => {
    try{
        console.log('actualizando alumno')
        const {
            id,
            nombre,
            segundo_nombre,
            apellido,
            segundo_apellido,
            fecha_nacimiento,
            correo,
        } = req.body;

        const response = await pool.query(`UPDATE alumno
                                            SET nombre = $2,
                                                apellido = $3,
                                                fecha_nacimiento = $4,
                                                correo = $5,
                                                segundo_nombre = $6,
                                                segundo_apellido = $7,
                                            WHERE id = $1`,
                                            [id, nombre, apellido,fecha_nacimiento,correo,segundo_nombre,segundo_apellido]);

        res.status(200).json(response.rows);
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

const updateCorreoAlumno =  async (req, res) => {
    try{
        
        const {
            id,
            correo,
        } = req.body;
        console.log('actualizando correo', req.body)
        const response = await pool.query(`
            UPDATE alumno
                set correo = $2
                where id = $1`,
            [id,correo]);

        res.status(200).send("materia inscrita correctamente");
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

const deleteAlumno = async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log("borrando alumno: ", id);
        const response2 = await pool.query(
            `delete from alumno where id = $1`,
            [id]
        );
        res.status(200);
        res.send("Se elimino correctamente la informacion");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const getinscripciones = async (req,res,next)=>{
    try{  
        const id = req.query.id_alumno;
        console.log('obteniendo inscripciones del alumno: ', id_alumno)
        const response = await pool.query(` SELECT * from inscripcion
                                            where id = $1`, 
                                        [id_alumno])
        res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const getinscripcion = async (req,res,next)=>{
    try{  
        const id_alumno = req.query.id_alumno;
        console.log('Obteniendo inscripcion mas actual del alumno: ', id_alumno)
        const response = await pool.query(` 
            select i.*, c.nombre as carrera, m.materias_inscritas
                from inscripcion i 
                inner join carrera c on i.id_carrera = c.id 
                left join (
                    select count(id_inscripcion)as materias_inscritas, id_inscripcion, id_alumno
                    from cursado 
                    group by id_inscripcion, id_alumno
                    )m on m.id_inscripcion = i.id and m.id_alumno = i.id_alumno
                where i.id_alumno = $1
                order by id desc 
                limit 1`
                    ,                   
                    [id_alumno]
                );
        res.status(200).json(response.rows[0])
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const getdocumento_faltantes = async (req,res,next)=>{
    try{  
        const id_alumno = req.query.id_alumno;
        const id_carrera = req.query.id_carrera;
        const id_inscripcion = req.query.id_inscripcion;
        console.log('obteniendo documentos del alumno: ', id_alumno,id_carrera,id_inscripcion)
        const response = await pool.query(` select * from documento d
                                left join (select * from ins_doc 
                                    where id_alumno = $1
                                        and id_carrera = $2
                                        and id_inscripcion = $3 ) 
                                    i on i.id_documento = d.id
                                where i.id_alumno is  null`, 
                                        [id_alumno,id_carrera,id_inscripcion])
        res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const getdocumentos = async (req,res,next)=>{
    try{  
        const id_alumno = req.query.id_alumno;
        const id_carrera = req.query.id_carrera;
        const id_inscripcion = req.query.id_inscripcion;
        console.log('obteniendo documentos del alumno: ', id_alumno,id_carrera,id_inscripcion)
        const response = await pool.query(` select * from documento d
                                left join (select * from ins_doc 
                                    where id_alumno = $1
                                        and id_carrera = $2
                                        and id_inscripcion = $3 ) 
                                    i on i.id_documento = d.id`, 
                                        [id_alumno,id_carrera,id_inscripcion])
        res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const insertDocumento = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            id_inscripcion,
            id_documento
        } = req.body;
        console.log("registrar documento: ",id_alumno,id_carrera,id_inscripcion,id_documento);
        const response = await pool.query(
        `INSERT INTO ins_doc values($1,$2,$3,$4)`,[id_alumno,id_carrera,id_inscripcion,id_documento] 
        );
        console.log('hola 200')
        res.send("documento guardado");
    } catch (e) {
        console.log(e);
        console.log('hola 500')
        res.status(500).send(e);
    }
};

const getTelefonos = async (req,res,next)=>{
    try{  
        const id_alumno = req.query.id_alumno;
        console.log('obteniendo numeros de telefono, id_alumno:', id_alumno)
        const response = await pool.query(` select * from telefono
                                            where id_alumno = $1`, 
                                        [id_alumno])
        res.status(200).json(response.rows)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const insertTelefono = async (req, res, next) => {
    
    try {
        const {
            id_alumno,
            numero,
            tipo_tlf
        } = req.body;
        console.log("registrar numero de telefono: ",id_alumno,numero,tipo_tlf);
        const response = await pool.query(
        `INSERT INTO telefono values($1,COALESCE((select id + 1 from telefono where id_alumno = $1 order by id desc limit 1),0),$2,$3)`,[id_alumno,tipo_tlf,numero] 
        );
        res.send("alumno guardado");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const deleteTelefono = async (req, res) => {
    try {
        const { 
            id_alumno, 
            id
        } = req.query
        console.log('eliminar telefono', req.query)
        const response1 = await pool.query('delete from telefono where id_alumno = $1 and id = $2;', [id_alumno, id])

        res.status(200).send("telefono eliminado");
        console.log('se eliminó correctamente')
    } catch (e) {
        console.log(e)
        console.log('no se pudo eliminar')
        res.status(500).send(e);
    }
}

const getCarreras = async(req, res,next) => {
    try{
        const response = await pool.query(`select * from carrera`);
        res.send(response.rows);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

const getMaterias = async(req, res,next) => {
    try{
        const id_carrera = req.query.id_carrera
        console.log('obtener materias de carrera id:',id_carrera)
        const response = await pool.query(`select * from materia where id_carrera = $1`,[id_carrera]);
        res.send(response.rows);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

const getMateriasAlumno = async(req, res,next) => {
    try{
        const id_alumno = req.query.id_alumno
        const id_carrera = req.query.id_carrera
        const id_inscripcion = req.query.id_inscripcion
        console.log('obteniendo materias',id_alumno,id_carrera,id_inscripcion)
        const response = await pool.query(`select c.*, p.nombre as periodo, m.nombre, m.uc from cursado c
            inner join periodo p on p.id= c.id_periodo
            inner join materia m on c.id_materia = m.id and c.id_carrera = m.id_carrera
            where c.id_alumno = $1
                and c.id_carrera = $2
                and c.id_inscripcion = $3
            order by id_periodo asc
            `,[id_alumno,id_carrera, id_inscripcion]);
        res.send(response.rows);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

const getPeriodos = async(req, res,next) => {
    try{
        console.log('Lista periodos para inscripcion')
        const response = await pool.query(`select * from periodo order by nombre desc`);
        res.send(response.rows);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}
const getPeriodosSinMaterias = async(req, res,next) => {
    try{
        console.log('Lista periodos para inscripcion')
        const response = await pool.query(`
            select p.* from periodo p
            where p.id not in ( select id_periodo from cursado)
            order by nombre desc
            `);
        res.send(response.rows);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

const updatePeriodo = async(req, res, next) => {
    try {
        const {
            id,
            nombre
        } = req.body;
        console.log("actualizar periodo: ", req.body);

        const response = await pool.query(
            `update periodo 
                set nombre = $2,
                where id = $1`,
            [
                id,
                nombre
            ]
        );
        res.send("Periodo Actualizado correctamente");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    } 
}

const deletePeriodo = async(req, res, next) =>{
    try {
        const {
            id,
        } = req.body;
        console.log("eliminar periodo: ",id);

        const response = await pool.query(
            `delete from periodo 
                where id = $1`,
            [
                id,
            ]
        );
        res.send("periodo eliminado");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    } 
}

const insertMateria = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            id_inscripcion,
            id_materia,
            id_periodo,
            fecha_cursado,
            estado,
            
        } = req.body;
        console.log("registrar nueva materia a cursar: ", req.body);

        const response = await pool.query(
            `insert into cursado values($1,$2,$3,$4,$5,$6,$7)`,
            [
                id_alumno,
                id_carrera,
                id_inscripcion,
                id_materia,
                id_periodo,
                fecha_cursado,
                estado, 
            ]
        );
        res.send("materia inscrita correctamente");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updateMateria = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            id_inscripcion,
            id_materia,
            id_periodo,
            nota,
            estado,
        } = req.body;
        console.log("actualizar materia: ", req.body,id_alumno);

        const response = await pool.query(
            `update cursado 
                set nota_curso = $6,
                    estado = $7
                where id_alumno = $1
                    and id_carrera = $2
                    and id_inscripcion= $3
                    and id_materia= $4
                    and id_periodo = $5`,
            [
                id_alumno,
                id_carrera,
                id_inscripcion,
                id_materia,
                id_periodo,
                nota,
                estado
            ]
        );
        res.send("materia inscrita correctamente");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const eliminarMateriaCursada = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            id_inscripcion,
            id_materia,
            id_periodo
        } = req.body;
        console.log("eliminar materia: ", req.body);

        const response = await pool.query(
            `delete from cursado 
                where id_alumno = $1
                    and id_carrera = $2
                    and id_inscripcion = $3
                    and id_materia =$4
                    and id_periodo =$5
                    and estado = 'cursando'`,
            [
                id_alumno,
                id_carrera,
                id_inscripcion,
                id_materia,
                id_periodo
            ]
        );
        res.send("materia eliminada");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const insertInscripcion = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            fecha_inscripcion,
            tipo_ins,
            estado_ins,
        } = req.body;
        console.log("registrar nueva inscripcion: ", req.body);

        const response = await pool.query(
            "insert into inscripcion values($1,$2,COALESCE((select id+1 from inscripcion where id_alumno = $1 order by id limit 1),0),$3,$4,$5)",
            [
                id_alumno,
                id_carrera,
                fecha_inscripcion,
                tipo_ins,
                estado_ins
            ]
        );
        res.send("inscripcion guardada");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const updateInscripcion = async (req, res, next) => {
    try {
        const {
            id_alumno,
            new_id_carrera,
            old_id_carrera,
            id,
            fecha_inscripcion,
            tipo_ins,
            estado_ins,
        } = req.body;
        console.log("actualizar inscripcion: ", req.body);

        const documentos = await pool.query(` select * from documento d
                                left join (select * from ins_doc 
                                    where id_alumno = $1
                                        and id_carrera = $2
                                        and id_inscripcion = $3 ) 
                                    i on i.id_documento = d.id`, 
                                        [id_alumno, old_id_carrera, id])
        for(doc of documentos.rows){
            const response = await pool.query(
                `delete from ins_doc 
                    where id_alumno = $1
                        and id_carrera = $2
                        and id_inscripcion = $3
                        and id_documento =$4`,
                [
                    doc.id_alumno,
                    doc.id_carrera,
                    doc.id_inscripcion,
                    doc.id_documento
                ]
            );
        }

        const response = await pool.query(
            `update inscripcion
                set id_carrera = $4,
                fecha_inscripcion = $5,
                    tipo_ins = $6,
                    estado_ins = $7
                    
                where id_alumno = $1
                    and id_carrera = $2
                    and id = $3`,
            [
                id_alumno,
                old_id_carrera,
                id,
                new_id_carrera,
                fecha_inscripcion,
                tipo_ins,
                estado_ins
            ]
        );
            
        for(doc of documentos.rows){
            if(doc.id_alumno != null){
                const redoc = await pool.query(
                    `INSERT INTO ins_doc values($1,$2,$3,$4)`,
                    [
                        doc.id_alumno,
                        new_id_carrera,
                        doc.id_inscripcion,
                        doc.id_documento
                    ] 
                );
            }
        }

        res.send("inscripcion modificada");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const insertarDocumentoIns = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            id_inscripcion,
            id_documento,
        } = req.body;
        console.log("registrar documento en inscripcion: ", req.body);

        const response = await pool.query(
            `insert into ins_doc values($1,$2,$3,$4)`,
            [
                id_alumno,
                id_carrera,
                id_inscripcion,
                id_documento
            ]
        );
        res.send("documento agregado");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const eliminarDocumentoIns = async (req, res, next) => {
    try {
        const {
            id_alumno,
            id_carrera,
            id_inscripcion,
            id_documento,
        } = req.body;
        console.log("eliminar documento en inscripcion: ", req.body);

        const response = await pool.query(
            `delete from ins_doc 
                where id_alumno = $1
                    and id_carrera = $2
                    and id_inscripcion = $3
                    and id_documento =$4`,
            [
                id_alumno,
                id_carrera,
                id_inscripcion,
                id_documento
            ]
        );
        res.send("documento eliminado");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}



module.exports = {
    getCarreras,
    getMaterias,
    getMateriasAlumno,
    insertMateria,
    updateMateria,
    eliminarMateriaCursada,
    getPeriodos,
    getPeriodosSinMaterias,
    updatePeriodo,
    deletePeriodo,
    insertInscripcion,
    updateInscripcion,
    insertarDocumentoIns,
    eliminarDocumentoIns,
    getAlumnos,
    getAlumnosExt,
    getAlumno,
    createAlumno,
    updateAlumno,
    updateCorreoAlumno,
    deleteAlumno,
    getinscripciones,
    getinscripcion,
    getdocumento_faltantes,
    getdocumentos,
    insertDocumento,
    getTelefonos,
    insertTelefono,
    deleteTelefono,
};
