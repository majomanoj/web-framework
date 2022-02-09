import { Renderer } from '../framework/view-layer/renderer';
import { User } from './user';
import { UserAttributes } from './user-attributes';

export class UserForm extends Renderer<User, UserAttributes> {
  //   constructor(public parent: Element, public user: User) {
  //     super(parent, user);
  //   }
  //   private changeDetection() {
  //     this.user.event.on(EVENT_LIST.Change, () => {
  //       this.render();
  //     });
  //   }

  template(): string {
    return `<div>
    <form style="padding: 5px">
      <div id="formFields">
        <input placeholder="New name" id="userName" type="text" /> <br />
      </div>
      <div id="formFields">
        <button id="save">Save</button> <button id="btn">Change Age</button>
      </div>
    </form>
  </div>`;
  }

  //    bindEvents(fragemnt: DocumentFragment): void {
  //     for (const item in this.eventMap()) {
  //       const [listner, selector] = item.split(':');
  //       fragemnt.querySelectorAll(selector).forEach((elem: Element) => {
  //         elem.addEventListener(listner, this.eventMap()[item]);
  //       });
  //     }
  //   }
  //   render(): void {
  //     this.parent.innerHTML = '';
  //     const templateElement = document.createElement('template');
  //     templateElement.innerHTML = this.template();
  //     this.bindEvents(templateElement.content);
  //     this.bindCss(templateElement.content);
  //     this.parent.append(templateElement.content);
  //   }
  //   protected bindCss(fragemnt: DocumentFragment) {
  //     for (const selector in this.cssMap()) {
  //       fragemnt.querySelectorAll(selector).forEach((elem: Element) => {
  //         elem.setAttribute('style', this.cssMap()[selector]);
  //       });
  //     }
  //   }

  protected cssMap(): { [key: string]: string } {
    return {
      '#formFields': 'padding:2px',
    };
  }

  protected eventMap(): { [key: string]: () => void } {
    return {
      'click:#btn': this.onBtnClick,
      'click:#save': this.onFormSubmit,
    };
  }
  private onFormSubmit = (): void => {
    const input = this.parent.querySelector<HTMLInputElement>('input#userName');
    if (input) {
      if (input.value) {
        this.model.set({ name: input.value });
      } else {
        alert('please enter a valid user name');
      }
    }
    this.model.persistData();
  };
  private onBtnClick = (): void => {
    this.model.set({ age: Math.round(Math.random() * 100) });
    this.model.persistData();
  };
}
