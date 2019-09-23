import {OrderedEventListenerConfig} from './OrderedEventListenerConfig'
import {EventListenerBuilder} from './EventListenerBuilder'

/**
 * @class
 * @extends {EventListenerBuilder}
 */
export class OrderedEventListenerBuilder extends EventListenerBuilder {
  /**
   *
   * @param {SymbolStringArray} events
   */
  constructor(events) {
    super(events)
    /**
     *
     * @params {number}
     * @protected
     */
    this._priority = 100
  }

  /**
   *
   * @param {number} priority
   * @return {OrderedEventListenerBuilder}
   */
  priority(priority) {
    this._priority = priority
    return this
  }

  /**
   *
   * @return {OrderedEventListenerConfig}
   */
  build() {
    return OrderedEventListenerConfig.create(this._events, this._callback, this._priority)
  }
}
