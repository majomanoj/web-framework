import { IEventsModel, EVENT_LIST } from './dataInterfaces';

type CallBack = () => void;
export class EventListner implements IEventsModel {
  private eventList: { [key: string]: CallBack[] } = {};
  on = (eventName: EVENT_LIST, callback: CallBack): void => {
    const handlers = this.eventList[eventName] || [];
    handlers.push(callback);
    this.eventList[eventName] = handlers;
  };
  trigger = (eventName: EVENT_LIST): void => {
    let triggers = this.eventList[eventName];
    if (!triggers || triggers.length === 0) {
      return;
    } else {
      triggers.forEach((callBack) => {
        callBack();
      });
    }
  };
}
