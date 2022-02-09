import { EventListner } from './eventListner';
import { EVENT_LIST } from './dataInterfaces';
import { SyncData } from './syncData';

export class Collection<T, K> {
  collections: T[] = [];
  events: EventListner = new EventListner();
  syncService: SyncData<K> = new SyncData<K>(this.rootUrl);
  constructor(private rootUrl: string, public deserialize: (json: K) => T) {}
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    this.syncService.getAllData().then((res: K[]) => {
      res.forEach((data: K) => {
        this.collections.push(this.deserialize(data));
      });
      this.trigger(EVENT_LIST.Change);
    });
  }
}
