enum RolesEnum {
    ADMIN = 'ADM',
    JUGADOR = 'JUG',
    SEO = 'SEO'
}

enum EstadoEnum {
    FINALIZADO = 'F',
    ACTIVO = 'A',
    PROCESO = 'P',
    ELIMINADO = 'D',
}

enum TipoGrupoEnum {
    SIMPLE = 'S',
    MULTIPLE = 'M',
}

enum TipoPrivacidadEnum {
    PUBLICO = 'PUB',
    PRIVADO = 'PR'
}

enum TypeKeyParamEnum {
    OBJECT_ID = 'objectId',
    PK_ORACLE = 'primaryKey',
    PAGE = 'pagina',
    LIMIT = 'limite',
    USER = 'usuario',
    PASSWORD = 'password',
    PARAM_BUSQUEDA = 'busqueda',
    TIPO_TAREA = 'Tipo tarea',
}

export  {TypeKeyParamEnum,RolesEnum, EstadoEnum}