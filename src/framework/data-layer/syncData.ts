import { IHasId, ISyncService } from './dataInterfaces';

export class SyncData<T extends IHasId> implements ISyncService<T> {
  constructor(private rootUrl: string) {}
  getData(id: number): Promise<T> {
    return fetch(`${this.rootUrl + id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
  }
  getAllData(): Promise<T[]> {
    return fetch(this.rootUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
  }
  saveData(data: T): Promise<T> {
    const id: number | undefined = data.id;
    if (id) {
      return fetch(`${this.rootUrl + id}`, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
    } else {
      return fetch(this.rootUrl, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
    }
  }
}
