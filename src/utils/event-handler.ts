/**
 * A simple event handler class to emit and listen to events.
 * Note that an event can only be listened once. If an event is listened to
 * multiple times, only the latest registered callback will be executed.
 *
 * Type T1 refers to the list of events accepted by the handler.
 * Type T2 refers to the callback.
 */
export class EventHandler<T1 extends string, T2 extends Function> {
  private events: {
    [event: string]: T2;
  } = {};

  /**
   * Listen to the specified event and execute the given callback whenever
   * the event is triggered.
   *
   * @param event
   * @param callback
   */
  on(event: T1, callback: T2): void {
    this.events[event] = callback;
  }

  /**
   * Emit an event with the given data.
   *
   * @param event
   * @param data
   */
  emit(event: T1, ...data: any): void {
    if (this.events[event]) this.events[event](...data);
  }
}
