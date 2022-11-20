export interface PartidoDto {
    local: number,
    visitante: number,
    fecha: Date,
    marcadorLocal: number,
    marcadorVisitante: number,
    penalesLocal: number,
    penalesVisitante: number
}

export interface PartidoEditDto {
    local: number,
    visitante: number,
    fecha: Date,
    marcadorLocal: number,
    marcadorVisitante: number,
    penalesLocal: number,
    penalesVisitante: number
    usurioModificacion?:string
    sucursalModificacion?:number
    fechaModificacion?:Date 
}