export interface RolUserDto {
    codRol:string,
    codUsuario:string,
    codGrupo:string,
    usuarioRegistro?: string,
}
export interface RolUserEditDto {
    codRol:string,
    codUsuario:string,
    codGrupo:string,
    usurioModificacion?:string
    fechaModificacion?:Date 
}

export const RolUserRegex: RolUserDto = {
    codRol: "^[A-Z]{3,5}$",
    codUsuario: "^[a-fA-F0-9]{20,50}$",
    codGrupo: "^[a-fA-F0-9]{20,50}$",
};