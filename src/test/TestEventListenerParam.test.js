/* global runTest */
import {EventListenerParam} from '../js/EventListenerParam'
import {EventListenerBuilder} from '../js/EventListenerBuilder'

import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

export class TestEventListenerParam extends TestCase {
  testEventHandlerBase() {
    const eventListenerBuilder = new EventListenerBuilder.listen('toto').callback(a=>a).build()
  }

}

runTest(TestEventListenerParam)
