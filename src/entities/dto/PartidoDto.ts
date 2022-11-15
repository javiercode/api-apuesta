export interface PartidoDto {
    local: string,
    visitante: string,
    fecha: Date,
    marcadorLocal: number,
    marcadorVisitante: number,
    penalesLocal: number,
    penalesVisitante: number
}

export interface PartidoEditDto {
    local: string,
    visitante: string,
    fecha: Date,
    marcadorLocal: number,
    marcadorVisitante: number,
    penalesLocal: number,
    penalesVisitante: number
    usurioModificacion?:string
    sucursalModificacion?:number
    fechaModificacion?:Date 
}