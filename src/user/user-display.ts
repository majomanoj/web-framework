import { Renderer } from '../framework/view-layer/renderer';
import { User } from './user';
import { UserAttributes } from './user-attributes';

export class UserDisplay extends Renderer<User, UserAttributes> {
  template(): string {
    return `
     <div id="default-padding">
        <strong> Name - </strong>${this.model.get('name')} <br />
      </div>
      <div id="default-padding">
        <strong> Age </strong> - ${this.model.get('age')} <br />
      </div>
      `;
  }

  protected cssMap(): { [key: string]: string } {
    return {
      '#default-padding': 'padding-left:7px;padding-top:5px',
    };
  }
}
