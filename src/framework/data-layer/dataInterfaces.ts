type CallBack = () => void;
export interface IHasId {
  id?: number;
}
export interface IProps<T> {
  get<K extends keyof T>(key: K): T[K];
  set(data: T): void;
}
export interface ISyncService<T> {
  getData(id: number): Promise<T>;
  getAllData(): Promise<T[]>;
  saveData(data: T): Promise<T>;
}
export interface IEventsModel {
  on(eventName: EVENT_LIST, callback: CallBack): void;
  trigger(eventName: EVENT_LIST): void;
}

export enum EVENT_LIST {
  Change,
  Click,
  Save,
  Update,
}
