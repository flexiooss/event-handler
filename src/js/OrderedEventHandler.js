import {assertType} from '@flexio-oss/assert'
import {StringArray} from '@flexio-oss/extended-flex-types'
import {EventHandlerBase} from './EventHandlerBase'
import {sortMap} from '@flexio-oss/js-type-helpers'
import {OrderedEventListenerConfig} from './OrderedEventListenerConfig'

/**
 * @class
 * @extends {EventHandlerBase}
 */
export class OrderedEventHandler extends EventHandlerBase {
  /**
   *
   * @param {OrderedEventListenerConfig} orderedEventListenerConfig
   * @return {(String|StringArray)} externalChooserPublic
   * @throws AssertionError
   */
  addEventListener(orderedEventListenerConfig) {
    assertType(orderedEventListenerConfig instanceof OrderedEventListenerConfig,
      'EventHandler:addEventListener: ̀`orderedEventListenerConfig` argument assert be an instance of OrderedEventListenerConfig'
    )

    const ids = new StringArray()
    for (const event of orderedEventListenerConfig.events) {
      this._ensureHaveListenersMap(event)

      const id = this.nextID()

      this._listeners.get(event).set(id, {
        callback: orderedEventListenerConfig.callback,
        priority: orderedEventListenerConfig.priority
      })

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

  /**
   * @protected
   * @param {(String|Symbol)} event
   * @param {String} token
   */
  _invokeCallback(event, token) {
    this._isPending.add(token)
    try {
      const listener = this._listeners.get(event).get(token)
      listener.callback(
        this._pendingPayload.get(event),
        event
      )
    } finally {
      this._isHandled.add(token)
    }
  }
}
