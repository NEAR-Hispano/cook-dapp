import { getID } from "../utils";

@nearBindgen
class Calendar {  
  events: Array<Event>;

  constructor() {
    this.events = new Array();
  }

  private getEventIndex(eventID: string): i32 {
    let index = this.events.map(event => event.id).indexOf(eventID);
    assert(index, "Event not found.")
    return index;
  }

  addEvent(title: string, start: string, end: string): void {
    this.events.push(new Event(title, start, end));
  }

  editEvent(eventID: string, event: Event): void {
    let index = this.getEventIndex(eventID);
    this.events[index] = event;
  }

  removeEvent(eventID: string): void {
    let index = this.getEventIndex(eventID);
    this.events.splice(index, 1);
  }
}

@nearBindgen
class Event {
    id: string;
    title: string;    
    start: string;
    end: string;

    constructor(title: string, start: string, end: string) {
        this.id = getID();
        this.title = title;
        this.start = start;
        this.end = end;
    }
}

export default Calendar;
