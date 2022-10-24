enum RolesTypeEnum {
    ADMIN = 'ADM',
    GERENTE = 'GER',
    JEFE = 'JEF',
    OFICIAL = 'OFI'
}

enum EstadoEnum {
    FINALIZADO = 'F',
    ACTIVO = 'A',
    PROCESO = 'P',
    ELIMINADO = 'D',
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

export  {TypeKeyParamEnum,RolesTypeEnum, EstadoEnum}