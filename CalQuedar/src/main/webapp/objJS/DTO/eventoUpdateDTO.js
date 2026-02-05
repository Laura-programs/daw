export class EventoUpdateDTO {
    constructor(id, titulo, visibilidad, etiqueta, fechaInicio, fechaFin, descripcion) {
        this.id = id;
        this.titulo = titulo;
        this.visibilidad = visibilidad;
        this.etiqueta = etiqueta;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.descripcion = descripcion
    }
}