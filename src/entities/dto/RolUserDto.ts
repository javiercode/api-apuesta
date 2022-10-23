export interface createRolUserDto {
    codRolAplicacion: string,
    usuario: string,
    sucursal: number
}

export interface rolUserDtoParcial {
    usuario: string,
    codRolAplicacion: string
}

export interface editRolUser {
    id: number,
    idRol: number,
    usuario: string,
    sucursal: number
}

export interface createRolUserDto {
    codRolAplicacion: string,
    usuario: string,
    sucursal: number
}

export interface createRolUserForm {
    codRolAplicacion: string,
    usuario: string,
    sucursal: string
}

export const RolUserRegex: createRolUserForm = {
    codRolAplicacion: "^[0-9]{1,2}$",
    usuario: "^[a-zA-Z0-9]{3,4}$",
    sucursal: "^[0-9]{1,3}$",
};