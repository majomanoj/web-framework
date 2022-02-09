import { Attributes } from '../framework/data-layer/attributes';
import { Model } from '../framework/data-layer/model';
import { SyncData } from '../framework/data-layer/syncData';
import { EventListner } from '../framework/data-layer/eventListner';
import { Collection } from '../framework/data-layer/collection';
import { UserAttributes } from './user-attributes';

const rootUrl = 'http://localhost:3000/users/';
export class User extends Model<UserAttributes> {
  static createInstance(attributes: UserAttributes): User {
    return new User(
      new Attributes<UserAttributes>(attributes),
      new SyncData<UserAttributes>(rootUrl),
      new EventListner()
    );
  }
  static createCollectionInstance(): Collection<User, UserAttributes> {
    return new Collection<User, UserAttributes>(
      rootUrl,
      (json: UserAttributes) => User.createInstance(json)
    );
  }
}
