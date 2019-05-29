/* global runTest */
import {EventListenerBuilder} from '../js/EventListenerBuilder'
import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

export class TestEventListenerBuilder extends TestCase {
  testEventHandlerBase() {
    const eventListenerBuilder = EventListenerBuilder.listen('toto')
  }

}

runTest(TestEventListenerBuilder)
