/**
 * A simple event handler class to emit and listen to events.
 * Note that an event can only be listened once. If an event is listened to
 * multiple times, only the latest registered callback will be executed.
 *
 * Type T refers to the list of events accepted by the handler.
 * Type U refers to the callback.
 */
export class EventHandler<T extends string, U extends Function> {
  private events: {
    [event: string]: U;
  } = {};

  /**
   * Listen to the specified event and execute the given callback whenever
   * the event is triggered.
   *
   * @param event
   * @param callback
   */
  on(event: T, callback: U): void {
    this.events[event] = callback;
  }

  /**
   * Emit an event with the given data.
   *
   * @param event
   * @param data
   */
  emit(event: T, ...data: any): void {
    if (this.events[event]) this.events[event](...data);
  }
}
