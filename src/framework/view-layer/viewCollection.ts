import { Collection } from '../data-layer/collection';
import { IViewCollection } from './viewInterfaces';

export abstract class ViewCollection<T, K> implements IViewCollection<T> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}
  protected abstract renderItem(model: T, parent: Element): void;
  render(): void {
    this.parent.innerHTML = '';
    const template = document.createElement('template');
    for (let model of this.collection.collections) {
      const item = document.createElement('div');
      this.renderItem(model, item);
      template.content.append(item);
    }
    this.parent.append(template.content);
  }
}
