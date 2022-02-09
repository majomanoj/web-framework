import { ViewCollection } from '../framework/view-layer/viewCollection';
import { User } from './user';
import { UserDisplay } from './user-display';
import { UserView } from './user-view';
import { UserAttributes } from './user-attributes';

export class UserViewList extends ViewCollection<User, UserAttributes> {
  protected renderItem(model: User, parent: Element): void {
    new UserView(parent, model).render();
  }
}
