import { Collection } from './framework/data-layer/collection';
import { EVENT_LIST } from './framework/data-layer/dataInterfaces';
import { User } from './user/user';
import { UserViewList } from './user/user-view-list';
import { UserAttributes } from './user/user-attributes';

// const events = new EventListner();
const rootUrl = 'http://localhost:3000/users/';
// const user = User.createCollectionInstance();

const collections: Collection<User, UserAttributes> = new Collection(
  rootUrl,
  (json: UserAttributes) => {
    return User.createInstance(json);
  }
);

collections.events.on(EVENT_LIST.Change, () => {
  const rootElement: Element | null = document.getElementById('root');
  if (rootElement) {
    const userCollectionView: UserViewList = new UserViewList(
      rootElement,
      collections
    );
    userCollectionView.render();
  }
});
collections.fetch();

// events.trigger('test');

// const collections: Collection<User, UserAttributes> =
//   User.createCollectionInstance();

// collections.on(EVENT_LIST.Change, () => {
//   console.log(collections);
// });
// collections.fetch();

// const user: User = User.createInstance({ id: 12 });
// user.event.on(EVENT_LIST.Change, () => {
//   console.log(user);
// });
// user.getPersistedData();

// user.set({ name: 'Majo Manoj 12' });

// user.persistData();

// const fetch = new SyncData<UserAttributes>('http://localhost:3000/users/');
