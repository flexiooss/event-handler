import {isNumber, assertType} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-type-helpers'
import {EventListenerConfig} from './EventListenerConfig'

/**
 * @extends {EventListenerConfig}
 */
export class OrderedEventListenerConfig extends EventListenerConfig {
  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {number} priority
   */
  constructor(events, callback, priority) {
    super(events, callback)
    assertType(isNumber(priority),
      'OrderedEventListenerConfig: ̀`priority` property should be a Number'
    )
    this.priority = priority
  }

  /**
   *
   * @param {SymbolStringArray} events
   * @param {EventHandlerBase~eventClb} callback
   * @param {number} priority
   * @return {OrderedEventListenerConfig}
   * @constructor
   * @readonly
   */
  static create(events, callback, priority) {
    return deepFreezeSeal(new OrderedEventListenerConfig(events, callback, priority))
  }
}
