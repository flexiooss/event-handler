import {assertType} from '@flexio-oss/assert'
import {StringArray} from '@flexio-oss/flex-types'
import {EventHandlerBase} from './EventHandlerBase'
import {sortMap} from '@flexio-oss/js-type-helpers'
import {OrderedEventListenerConfig} from './OrderedEventListenerConfig'


/**
 * @extends {EventHandlerBase}
 */
export class OrderedEventHandler extends EventHandlerBase {
  /**
   *
   * @param {OrderedEventListenerConfig} orderedEventListenerConfig
   * @return {(String|StringArray)}
   * @throws AssertionError
   * @override
   */
  addEventListener(orderedEventListenerConfig) {
    assertType(orderedEventListenerConfig instanceof OrderedEventListenerConfig,
      'EventHandler:addEventListener: ̀`orderedEventListenerConfig` argument assert be an instance of OrderedEventListenerConfig'
    )

    const ids = new StringArray()

    for (const event of orderedEventListenerConfig.events) {
      this._ensureHaveListenersMap(event)

      const id = this.nextID()

      this._listeners.get(event).set(id, orderedEventListenerConfig)

      this._listeners.set(event,
        sortMap(
          this._listeners.get(event),
          (a, b) => {
            return a.value.priority - b.value.priority
          }
        )
      )
      ids.push(id)
    }

    return ids.length > 1 ? ids : ids.first()
  }

}
