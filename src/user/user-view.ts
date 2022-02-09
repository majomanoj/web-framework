import { Renderer } from '../framework/view-layer/renderer';
import { User } from './user';
import { UserDisplay } from './user-display';
import { UserForm } from './user-form';
import { UserAttributes } from './user-attributes';

export class UserView extends Renderer<User, UserAttributes> {
  template(): string {
    return `
    <div class="container">
      <h1>User Form</h1>
      <div>
        <div class="user-display">
        </div>
        <div class="user-form">
        </div>
      </div>
    </div>`;
  }

  protected regionsMap(): { [key: string]: string } {
    return { userDisplay: '.user-display', userForm: '.user-form' };
  }
  protected cssMap(): { [key: string]: string } {
    return {
      '.container':
        'margin-left:auto;margin-right:auto;border:1px solid black;padding:5px;min-width: 200px;max-width: 300px;',
    };
  }
  protected onRender(): void {
    const userDisplay = new UserDisplay(
      this.regions['userDisplay'],
      this.model
    );
    userDisplay.render();
    const userForm = new UserForm(this.regions['userForm'], this.model);
    userForm.render();
  }
}
