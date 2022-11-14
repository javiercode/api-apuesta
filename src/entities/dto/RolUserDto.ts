export interface RolUserDto {
    codRol:string,
    codUsuario:string,
    codGrupo:string,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}
export interface RolUserEditDto {
    codRol:string,
    codUsuario:string,
    codGrupo:string,
    usurioModificacion?:string
    fechaModificacion?:Date 
}

export const RolUserRegex: RolUserDto = {
    codRol: "^[a-fA-F0-9]{20,50}$",
    codUsuario: "^[a-fA-F0-9]{20,50}$",
    codGrupo: "^[a-zA-Z0-9_]{3,300}$",
};