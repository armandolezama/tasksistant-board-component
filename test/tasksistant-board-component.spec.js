/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";
import '../tasksistant-board-component';

describe('Suite cases', () => {
    it('First Test', async () => {
        const element = await fixture('<tasksistant-board-component></tasksistant-board-component>');
        assert.strictEqual(_element.hello, 'Hello World!');
    })
})