import { Attributes } from './attributes';
import { EVENT_LIST, IHasId } from './dataInterfaces';
import { EventListner } from './eventListner';

export class Model<T extends IHasId> {
  constructor(
    private attributes: Attributes<T>,
    private persistence: SyncData<T>,
    private events: EventListner
  ) {}

  get get() {
    return this.attributes.get;
  }

  get getAll() {
    return this.attributes.getAllAttributes;
  }

  set = (newData: T) => {
    this.attributes.set(newData);
    this.events.trigger(EVENT_LIST.Change);
  };

  get event() {
    return this.events;
  }
  // get trigger() {
  //   return this.events.trigger;
  // }
  persistData() {
    this.persistence.saveData(this.attributes.getAllAttributes());
    this.events.trigger(EVENT_LIST.Save);
  }

  getPersistedData(): void {
    const id = this.get('id');
    if (!id) {
      throw new Error('Cannot find property id');
    } else {
      this.persistence.getData(id).then((res) => {
        this.set(res);
      });
    }
  }
}
