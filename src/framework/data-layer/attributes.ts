import { IProps } from './dataInterfaces';

export class Attributes<T> implements IProps<T> {
  constructor(private data: T) {}
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set = (data: T): void => {
    Object.assign(this.data, data);
  };
  getAllAttributes(): T {
    return this.data;
  }
}
