const { Sequelize, DataTypes } = require("sequelize");

// postgres://<USUARIO>:<PASSWORD>@<URL_HOST_BD>:<PUERTO_BD>/<NOMBRE_BD>


const CADENA_CONEXION = process.env.DATABASE_URL ||
  "postgresql://evaluaciones:evaluaciones@localhost:5432/postgres"

const sequelize = new Sequelize(CADENA_CONEXION, {
  dialectOptions: {
    ssl: process.env.DATABASE_URL ? true : false
  }
})

const usuario = sequelize.define("usuario", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  c_postal: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ciudad: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  contrasenia: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})
const producto = sequelize.define("producto", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })

const orden = sequelize.define("orden", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  usuario_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  monto: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })
const orden_producto = sequelize.define("orden_producto", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  orden_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  producto_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })
const pcarmado = sequelize.define("pcarmado", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  descripcion_id: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  tipo_id: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })

const tipo = sequelize.define("tipo", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  nombre: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

const descripcion = sequelize.define("descripcion", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  nombre: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

const pcarmado_producto = sequelize.define("pcarmado_producto", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  pcarmado_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  producto_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })
const reporte = sequelize.define("reporte", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  usuario_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  asunto: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })

const resenia = sequelize.define("resenia", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  usuario_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  puntaje: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  comentario: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  video: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  link: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  tipo_resenia: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
},
  {
    timestamps: false,
    freezeTableName: true
  })

//Relaciones
//reporte *-------->1 usuario
reporte.belongsTo(usuario, {
  foreignKey: "usuario_id"
})
usuario.hasMany(reporte, {
  foreignKey: "id"
})
//resenia *-------->1 usuario
resenia.belongsTo(usuario, {
  foreignKey: "usuario_id"
})
usuario.hasMany(resenia, {
  foreignKey: "id"
})
//orden *-------->1 usuario
orden.belongsTo(usuario, {
  foreignKey: "usuario_id"
})
usuario.hasMany(orden, {
  foreignKey: "id"
})
//orden_producto *-------->1 orden
orden_producto.belongsTo(orden, {
  foreignKey: "orden_id"
})
orden.hasMany(orden_producto, {
  foreignKey: "id"
})
//orden_producto *-------->1 producto
orden_producto.belongsTo(producto, {
  foreignKey: "producto_id"
})
producto.hasMany(orden_producto, {
  foreignKey: "id"
})
//pc_armado_producto *-------->1 producto
pcarmado_producto.belongsTo(producto, {
  foreignKey: "producto_id"
})
producto.hasMany(pcarmado_producto, {
  foreignKey: "id"
})
//pc_armado_producto *-------->1 pc_armado
pcarmado_producto.belongsTo(pcarmado, {
  foreignKey: "pcarmado_id"
})
pcarmado.hasMany(pcarmado_producto, {
  foreignKey: "id"
})
//pcarmado *-------->1 tipo
pcarmado.belongsTo(tipo, {
  foreignKey: "tipo_id"
})
tipo.hasMany(pcarmado, {
  foreignKey: "id"
})
//pcarmado *-------->1 descripcion
pcarmado.belongsTo(descripcion, {
  foreignKey: "descripcion_id"
})
descripcion.hasMany(pcarmado, {
  foreignKey: "id"
})

module.exports = { usuario, producto, orden, orden_producto, pcarmado,tipo,
  descripcion, pcarmado_producto, reporte, resenia }
/*
const CADENA_CONEXION = 
    "postgresql://evaluaciones:evaluaciones@localhost:5432/evaluacionesdb"

const sequelize = new Sequelize(CADENA_CONEXION)

const Carrera = sequelize.define("carrera", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(200),
        allowNull : false
    } 
}, {
    timestamps : false,
    freezeTableName : true
})

const Curso = sequelize.define("curso", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : false
    },
    carrera_id : {
        type : DataTypes.UUID,
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Evaluacion = sequelize.define("evaluacion", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    fecha_registro : {
        type : DataTypes.DATE,
        allowNull : true
    },
    curso_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    ciclo_id : {
        type : DataTypes.UUID,
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Ciclo = sequelize.define("ciclo", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(200),
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Estudiante = sequelize.define("estudiante", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    username : {
        type : DataTypes.STRING(20),
        allowNull : false
    },
    password : {
        type : DataTypes.STRING(100),
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Resolucion = sequelize.define("resolucion", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    estudiante_id : {
        type : DataTypes.UUID,
        allowNull : false        
    },
    evaluacion_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    fecha_envio : {
        type : DataTypes.DATE,
        allowNull : false
    },
    upvote : {
        type : DataTypes.INTEGER
    },
    url : {
        type : DataTypes.STRING(2048)
    }
}, {
    timestamps : false,
    freezeTableName : true
})


// Relaciones
// Curso * <----> 1 Carrera
Curso.belongsTo(Carrera, {
    foreignKey : "carrera_id"
})
Carrera.hasMany(Curso, {
    foreignKey : "id"
})

// Evaluacion * <----> 1 Curso
Evaluacion.belongsTo(Curso, {
    foreignKey : "curso_id"
})
Curso.hasMany(Evaluacion, {
    foreignKey : "id"
})

// Evaluacion * <----> 1 Ciclo
Evaluacion.belongsTo(Ciclo, {
    foreignKey : "ciclo_id"
})
Ciclo.hasMany(Evaluacion, {
    foreignKey : "id"
})

// Resolucion * <----> 1 Estudiante
Resolucion.belongsTo(Estudiante, {
    foreignKey : "estudiante_id"
})
Estudiante.hasMany(Resolucion, {
    foreignKey : "id"
})

// Resolucion * <----> 1 Evaluacion
Resolucion.belongsTo(Evaluacion, {
    foreignKey : "evaluacion_id"
})
Evaluacion.hasMany(Resolucion, {
    foreignKey : "id"
})


module.exports = {
    Carrera, Curso, Ciclo, Evaluacion, Estudiante, Resolucion
}
*/

