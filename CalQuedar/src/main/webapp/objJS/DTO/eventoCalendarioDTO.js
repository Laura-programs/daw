export class EventoCalendarioDTO {
    constructor(id, start, end, title, url, allDay, backgroundColor, borderColor, textColor) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.title = title;
        this.url = url;
        this.allDay = allDay;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.textColor = textColor;
    }
}