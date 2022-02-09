export interface IView {
  parent: Element;
  template(): string;
  render(): void;
}

export interface IViewCollection<T> {
  render(): void;
}
