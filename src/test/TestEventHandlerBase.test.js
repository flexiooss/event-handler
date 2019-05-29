/* global runTest */
import {EventHandlerBase} from '../js/EventHandlerBase'
import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

export class TestEventHandlerBase extends TestCase {
  testEventHandlerBase() {
    const eventHandlerBase = new EventHandlerBase()
  }

}

runTest(TestEventHandlerBase)
