import { EVENT_LIST } from '../data-layer/dataInterfaces';
import { Model } from '../data-layer/model';
import { IView } from './viewInterfaces';

export abstract class Renderer<T extends Model<K>, K> implements IView {
  regions: { [key: string]: Element } = {};
  constructor(public parent: Element, public model: T) {
    this.changeDetection();
  }
  abstract template(): string;
  protected eventMap(): { [key: string]: () => void } {
    return {};
  }
  protected cssMap(): { [key: string]: string } {
    return {};
  }
  protected regionsMap(): { [key: string]: string } {
    return {};
  }
  protected onRender(): void {}
  private mapRegion(fragment: DocumentFragment): void {
    for (const region in this.regionsMap()) {
      const elem = fragment.querySelector(this.regionsMap()[region]);
      if (elem) {
        this.regions[region] = elem;
      }
    }
  }
  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.bindCss(templateElement.content);
    this.mapRegion(templateElement.content);
    this.onRender();
    this.parent.append(templateElement.content);
  }
  private changeDetection() {
    this.model.event.on(EVENT_LIST.Change, () => {
      this.render();
    });
  }
  private bindEvents(fragemnt: DocumentFragment): void {
    for (const item in this.eventMap()) {
      const [listner, selector] = item.split(':');
      fragemnt.querySelectorAll(selector).forEach((elem: Element) => {
        elem.addEventListener(listner, this.eventMap()[item]);
      });
    }
  }

  private bindCss(fragemnt: DocumentFragment) {
    for (const selector in this.cssMap()) {
      fragemnt.querySelectorAll(selector).forEach((elem: Element) => {
        elem.setAttribute('style', this.cssMap()[selector]);
      });
    }
  }
}
