export interface RolUsuarioDto {
    codRol:string,
    codUsuario:string,
    usuarioRegistro?: string,
}
export interface RolUsuarioEditDto {
    codRol:string,
    codUsuario:string,
    usurioModificacion?:string
    fechaModificacion?:Date 
}

export interface createRolUserForm {
    codRol:string,
    codUsuario:string,
}

export const RolUserRegex: RolUsuarioDto = {
    codRol: "^[a-fA-F0-9]{20,50}$",
    codUsuario: "^[a-fA-F0-9]{20,50}$",
};