import React from 'react'
import { render } from 'react-dom'

import Modal from '@/components/Modal'

import { mount } from 'enzyme'
import flushPromises from 'flush-promises'

describe(`<Modal />`, () => {
  describe(`visible`, () => {
    it(`should be presented basic parts`, async () => {
      const wrapper = await mount(<Modal visible={true}/>)
      await wrapper.update()
      expect(wrapper.find(`[data-set='modal']`)).toHaveLength(1)
      expect(wrapper.find(`[data-set='modal-title']`)).toHaveLength(1)
      expect(wrapper.find(`[data-set='modal-body']`)).toHaveLength(1)
    })
  })

  describe(`render`, () => {
    it(`should be render slots`, async () => {
      const wrapper = await mount(
        <Modal
          visible={true}
          title={<header data-set="my-title">Top</header>}
          body={<form data-set="my-body"><input data-set="my-input"/></form>}
          footer={<div data-set="my-footer">Bottom</div>}
        />
      )
      await wrapper.update()
      expect(wrapper.find(`[data-set='my-title']`)).toHaveLength(1)
      expect(wrapper.find(`[data-set='my-body']`)).toHaveLength(1)
      expect(wrapper.find(`[data-set='my-input']`)).toHaveLength(1)
    })
  })

  describe(`events`, () => {
    it(`should be call onClose function on dismiss click`, async () => {
      const callback = jest.fn()
      const wrapper = await mount(
        <Modal
          visible={true}
          onClose={callback}
        />
      )
      await wrapper.update()
      wrapper.find(`[action-trigger='dismiss']`).first().simulate('click')
      expect(callback).toHaveBeenCalled()
    })

    it(`should be hide modal when ESC key is pressed`, async () => {
      const callback = jest.fn()
      render(
        <Modal
          visible={true}
          onClose={callback}
        />,
        document.createElement('div')
      )
      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }))
      expect(callback).toHaveBeenCalled()
    })

    it(`should not be hide modal when modal is clicked`, async () => {
      const callback = jest.fn()
      const wrapper = await mount(
        <Modal
          visible={true}
          onClose={callback}
        />
      )
      await wrapper.update()
      const modal = wrapper.find(`[data-set='modal']`)
      expect(modal).toHaveLength(1)
      modal.first().simulate('click')
      await wrapper.update()
      expect(wrapper.find(`[data-set='modal']`)).toHaveLength(1)
      expect(callback).not.toHaveBeenCalled()
    })
  })
})
