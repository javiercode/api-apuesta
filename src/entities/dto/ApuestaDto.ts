export interface ApuestaDto {
    codPartido:string,
    codRolUser:string,
    local:number,
    visitante:number,
    localPenales:number,
    visitantePenales:number,
    usuarioRegistro?: string,
    fechaRegistro?: Date,
}

export interface ApuestaEditDto {
    codPartido:string,
    codRolUser:string,
    local:number,
    visitante:number,
    localPenales:number,
    visitantePenales:number,
    usurioModificacion?:string,
    fechaModificacion?:Date 
}

export interface OApuestaRegex {
    codPartido:string,
    codRolUser:string,
    local:string,
    visitante:string,
    localPenales:string,
    visitantePenales:string
};
export const ApuestaRegex: OApuestaRegex = {
    codPartido:"^[a-fA-F0-9]{20,50}$",
    codRolUser:"^[a-fA-F0-9]{20,50}$",
    local:"^[0-9]{1,2}$",
    visitante:"^[0-9]{1,2}$",
    localPenales:"^[0-9]{1,2}$",
    visitantePenales:"^[0-9]{1,2}$",
};