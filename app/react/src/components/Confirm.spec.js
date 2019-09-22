import React from 'react'

import Confirm from '@/components/Confirm'

import { mount } from 'enzyme'
import flushPromises from 'flush-promises'

describe(`<Confirm />`, () => {
  describe(`render`, () => {
    const assertThat = (wrapper, payload) => {
      expect(wrapper.find(`[data-set='title']`).text()).toBe(payload.title)
      expect(wrapper.find(`[data-set='body']`).text()).toBe(payload.body)
      expect(wrapper.find(`[action-trigger='okText']`).text())
        .toBe(payload.okText)
      expect(wrapper.find(`[action-trigger='cancelText']`).text())
        .toBe(payload.cancelText)
    }

    it('should be presented with default text values', async () => {
      const wrapper = await mount(<Confirm />)
      wrapper.instance().show()
      await wrapper.update()
      assertThat(wrapper, {
        title: 'Title',
        body: 'Body',
        okText: 'Ok',
        cancelText: 'Cancel'
      })
    })

    it('should be presented with non default text values', async () => {
      const options = {
        title: 'Other Title',
        body: 'Other Body',
        okText: 'Confirm',
        cancelText: 'Dismiss'
      }
      const wrapper = await mount(<Confirm />)
      wrapper.instance().show(options)
      await wrapper.update()
      assertThat(wrapper, options)
    })
  })

  describe(`events`, () => {
    describe(`click`, () => {
      const assertEvent = async (actionTriggerName, before, after, result) => {
        let callback = jest.fn()
        const wrapper = await mount(<Confirm />)
        wrapper.instance().show().then(callback)
        await wrapper.update()
        expect(wrapper.find(`[data-set='title']`)).toHaveLength(before)
        await wrapper.find(`[action-trigger='${actionTriggerName}']`).first()
          .simulate('click')
        await wrapper.update()
        expect(wrapper.find(`[data-set='title']`)).toHaveLength(after)
        expect(callback).toHaveBeenCalledWith(result)
      }

      it(`ok`, async () => {
        await assertEvent('okText', 1, 0, true)
      })

      it(`cancel`, async () => {
        await assertEvent('cancelText', 1, 0, false)
      })

      it(`dismiss`, async () => {
        await assertEvent('dismiss', 1, 0, false)
      })
    })

    describe(`keydown`, () => {
      const assertEvent = async (keyCode, before, after, callback) => {
        const map = {}
        document.addEventListener = jest.fn((event, cb, other) => {
          map[event] = cb
        })
        const wrapper = await mount(<Confirm />)
        wrapper.instance().show().then(callback)
        await wrapper.update()
        expect(wrapper.find(`[data-set='title']`)).toHaveLength(before)
        map.keydown({ keyCode })
        await wrapper.update()
        expect(wrapper.find(`[data-set='title']`)).toHaveLength(after)
      }

      it(`esc`, async () => {
        const ESC_KEYCODE = 27
        const callback = jest.fn()
        await assertEvent(ESC_KEYCODE, 1, 0, callback)
        expect(callback).toHaveBeenCalledWith(false)
      })

      it(`enter`, async () => {
        const ENTER_KEYCODE = 13
        const callback = jest.fn()
        await assertEvent(ENTER_KEYCODE, 1, 0, callback)
        expect(callback).toHaveBeenCalledWith(true)
      })

      it(`different to esc and enter`, async () => {
        const TAB_KEYCODE = 9
        const callback = jest.fn()
        await assertEvent(TAB_KEYCODE, 1, 1, callback)
        expect(callback).not.toHaveBeenCalled()
      })
    })
  })
})
