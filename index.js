const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const data = require("./test_data") // importamos data de test
const { usuario, producto, orden, orden_producto, pcarmado, pcarmado_producto, reporte, resenia } = require("./dao")

const PUERTO = process.env.PORT || 4444

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors()) // politica CORS (cualquier origen) <---- TODO: cuidado!!!
app.use(express.static("assets")) // <-- configuracion de contenido estatico

app.post("/usuarios", async (req, resp) => {
  const dataRequest = req.body
  const nombre = dataRequest.nombre
  const apellido = dataRequest.apellido
  const correo = dataRequest.correo
  const c_postal = dataRequest.c_postal
  const telefono = dataRequest.telefono
  const ciudad = dataRequest.ciudad
  const direccion = dataRequest.direccion
  const contrasenia = dataRequest.contrasenia

  await usuario.create({
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    c_postal: c_postal,
    telefono: telefono,
    ciudad: ciudad,
    direccion: direccion,
    contrasenia: contrasenia,
  })

  resp.send({
    confirmar: "Registro exitoso"
  })
})

app.post("/reporte", async (req, resp) => {
  const dataRequest = req.body
  const correo = dataRequest.correo
  const nombre = dataRequest.nombre
  const telefono = dataRequest.telefono
  const asunto = dataRequest.asunto
  const descripcion = dataRequest.descripcion
  //se necesitaria esto? 
  const usuario_id = dataRequest.usuario_id


  await reporte.create({
    correo: correo,
    nombre: nombre,
    telefono: telefono,
    asunto: asunto,
    descripcion: descripcion,
    usuario_id: usuario_id,
  })
  resp.send({
    confirmar: "Reporte enviado correctamente"
  })
})

app.post("/resenia", async (req, resp) => {
  const dataRequest = req.body
  const puntaje = dataRequest.puntaje
  const comentario = dataRequest.comentario
  const video = dataRequest.video
  const link = dataRequest.link
  const tipo_resenia = dataRequest.tipo_resenia
  const usuario_id = dataRequest.usuario_id
  await resenia.create({
    puntaje: puntaje,
    comentario: comentario,
    video: video,
    link: link,
    tipo_resenia: tipo_resenia,
    usuario_id: usuario_id,
  })
  resp.send({
    confirmar: "Reseña enviada correctamente"
  })
})

app.get("/productos", async (req, resp) => {
  const listaproductos = await producto.findAll()
  resp.send(listaproductos)
})

// query parameter "/pcarmado?descripcion=ofimatica&tipo=laptop"
app.get("/pcarmado", async (req, resp) => {
  const desc = req.query.descripcion
  const tipoC = req.query.tipo
  //console.log(desc +" "+tipoC)

  if (tipoC == undefined || tipoC === "-1") {
    const listapcarmado = await pcarmado.findAll({
      where : {
        descripcion: desc
      }
    })
    resp.send(listapcarmado)
  } else {
    const listapcarmado = await pcarmado.findAll({
      where: {
        descripcion: desc,
        tipo:tipoC
      }
    })
    resp.send(listapcarmado)
  }
})

app.get("/pcarm_producto", async (req, resp) => {
  const listapcarm_produto = await pcarmado_producto.findAll()
  resp.send(listapcarm_produto)

})
app.get("/historial_compras", async (req, resp) => {
  const listahistorial_compras = await orden_producto.findAll()
  resp.send(listahistorial_compras)
})
app.get("/orden", async (req, resp) => {
  const listaorden = await orden.findAll()
  resp.send(listaorden)
})


app.listen(PUERTO, () => {
  console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})
