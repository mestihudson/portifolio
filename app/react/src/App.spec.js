jest.mock('@/services/api', () => {
  return {
    removeTool: jest.fn(),
    createTool: jest.fn(),
    getTools: jest.fn()
  }
})
jest.mock('@/services/Confirm', () => {
  return {
    show: jest.fn()
  }
})

import React from 'react'

import App from '@/App'
import api from '@/services/api'
import Confirm from '@/services/Confirm'

import { mount } from 'enzyme'
import flushPromises from 'flush-promises'

describe(`<App />`, () => {
  describe(`list`, () => {
    it('should not be presented', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = []
        return Promise.resolve(result)
      })
      const wrapper = await mount(<App/>)
      await wrapper.update()
      expect(wrapper.find(`[data-set='ferramenta']`)).toHaveLength(0)
    })

    it('should be presented with one size', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          {
            title: 'Título',
            link: 'http://fer.ra/me',
            description: 'Descrição',
            tags: ['t1', 't2']
          }
        ]
        return Promise.resolve(result)
      })

      const wrapper = await mount(<App/>)
      await wrapper.update()
      const ferramentas = wrapper.find(`[data-set='ferramenta']`)
      expect(ferramentas).toHaveLength(1)
      const ferramenta = ferramentas.at(0)
      expect(ferramenta.find(`[data-set='title']`).text()).toBe('Título')
      expect(ferramenta.find(`[data-set='link']`).prop('href'))
        .toBe('http://fer.ra/me')
      expect(ferramenta.find(`[data-set='description']`).text())
        .toBe('Descrição')
      const tags = ferramenta.find(`[data-set='tags']`)
      expect(tags.text()).toContain('t1')
      expect(tags.text()).toContain('t2')
    })

    it('should be presented with two size', async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          {
            title: 'Título',
            link: 'http://fer.ra/me',
            description: 'Descrição',
            tags: ['t1', 't2']
          },
          {
            title: 'Título',
            link: 'http://fer.ra/me',
            description: 'Descrição',
            tags: ['t1', 't2']
          }
        ]
        return Promise.resolve(result)
      })
      const wrapper = await mount(<App/>)
      await wrapper.update()
      expect(wrapper.find(`[data-set='ferramenta']`)).toHaveLength(2)
    })
  })

  describe(`search`, () => {
    let wrapper

    beforeEach(async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { id: 1, title: 'Título da Ferramenta 1', tags: ['a'] },
          { id: 2, title: 'Título da Ferramenta 2', tags: ['a', 'b', 'c'] },
          { id: 3, title: 'Título da Ferramenta 3', tags: ['a', 'c'] }
        ]
        return Promise.resolve(result)
      })
      wrapper = await mount(<App/>)
      await wrapper.update()
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(3)
    })

    it('globally', async () => {
      const input = await wrapper.find(`[data-input='criterio']`).first()
      input.simulate('keyup', { target: { value: 'Ferramenta 2' }})
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(1)
    })

    describe('by tag', () => {
      const assertTo = async (criterio, length) => {
        const tags = await wrapper.find(`[data-input='tags']`).first()
        tags.simulate('click')
        const input = await wrapper.find(`[data-input='criterio']`).first()
        input.simulate('keyup', { target: { value: criterio }})
        expect(await wrapper.find(`[data-set='ferramenta']`))
          .toHaveLength(length)
      }

      it('should be presented one size', () => {
        assertTo('b', 1)
      })

      it('should be presented two size', () => {
        assertTo('c', 2)
      })

      it('should be presented three size', () => {
        assertTo('a', 3)
      })
    })
  })

  describe(`add`, () => {
    let wrapper

    beforeEach(async () => {
      api.createTool.mockImplementationOnce((tool) => {
        const result = { ...tool, id: 1 }
        return Promise.resolve(result)
      })
    })

    it(`should be presented one size from empty`, async() => {
      api.getTools.mockImplementationOnce(() => {
        const result = []
        return Promise.resolve(result)
      })
      wrapper = await mount(<App/>)
      await wrapper.update()
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(0)

      await wrapper.find(`[action-trigger='nova']`).first().simulate('click')
      await flushPromises()

      wrapper.find(`[data-input='title']`).first()
        .simulate('keyup', { target: { value: 'Título' } })
      wrapper.find(`[data-input='link']`).first()
        .simulate('keyup', { target: { value: 'http://li.nk' } })
      wrapper.find(`[data-input='description']`).first()
        .simulate('keyup', { target: { value: 'Descrição' } })
      wrapper.find(`[data-input='marcadores']`).first()
        .simulate('keyup', { target: { value: 't1 t2' } })
      await wrapper.find(`[action-trigger='adicionar']`).first()
        .simulate('click')

      await flushPromises()
      await wrapper.update()
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(1)

      expect(api.createTool).toHaveBeenCalledWith({
        link: 'http://li.nk',
        description: 'Descrição',
        tags: ['t1', 't2'],
        title: 'Título'
      })
    })
  })

  describe(`remove`, () => {
    let wrapper

    beforeEach(async () => {
      api.getTools.mockImplementationOnce(() => {
        const result = [
          { id: 1, title: 'Título da Ferramenta 1', tags: ['a'] }
        ]
        return Promise.resolve(result)
      })
      api.removeTool.mockImplementationOnce(() => {
        return Promise.resolve()
      })
      wrapper = await mount(<App/>)
      await wrapper.update()
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(1)
    })

    it(`should be presented empty from one size after confirm`, async() => {
      Confirm.show = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(true))
      await wrapper.find(`[action-trigger='remover']`).first()
        .simulate('click')
      await flushPromises()
      await wrapper.update()
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(0)
      expect(api.removeTool).toHaveBeenCalledWith(1)
    })

    it(`should be presented one from one size after cancel`, async() => {
      Confirm.show = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(false))
      await wrapper.find(`[action-trigger='remover']`).first()
        .simulate('click')
      await flushPromises()
      await wrapper.update()
      expect(await wrapper.find(`[data-set='ferramenta']`)).toHaveLength(1)
    })
  })
})
