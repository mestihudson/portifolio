import { Given, When, Then } from 'cucumber'
import { expect } from 'chai'
import Backend from './backend'
import Frontend from './frontend'

let backend = new Backend('/ws/api/.db.json')
let frontend = new Frontend(process.env.APP_URL)

Given('that there is one tool', async () => {
  await backend.registrar({
    tools: [
      {
        id: 1,
        title: 'Ferramenta 1',
        link: 'http://fer.ra/me',
        description: 'Descrição',
        tags: ['t1', 't2']
      }
    ]
  })
})

When('i request a list of all tools', async () => {
  await frontend.entrar(1)
  expect(await frontend.titulo()).to.be.contains('VUTTR')
})

Then('i verify that one tool is presented', async () => {
  expect((await frontend.ferramentas()).length).to.be.equals(1)
})

Given('that there is no one tool', async () => {
  backend.registrar({ tools: [] })
})

Then('i verify that none tool is presented', async () => {
  expect((await frontend.ferramentas()).length).to.be.equals(0)
})

Given('that there is more than one tool', async () => {
  backend.registrar({
    tools: [
      { id: 1, title: 'Ferramenta 1', tags: ['a'] },
      { id: 2, title: 'Ferramenta 2', tags: ['a', 'b'] }
    ]
  })
})

Then('i verify that more than one tool is presented', async () => {
  expect((await frontend.ferramentas()).length).to.be.equals(2)
})

When('i request to add a new tool', async () => {
  await frontend.entrar()
  await frontend.adicionar()
})

Then('i verify that exactly three tools are presented', async () => {
  expect((await frontend.ferramentas()).length).to.be.equals(3)
})

When('i request to remove a tool', async () => {
  await frontend.entrar()
  await frontend.remover()
})

When('i search by global criteria', async () => {
  await frontend.entrar()
  await frontend.procurar('Ferramenta 2')
})

When('i search by specific tag', async () => {
  await frontend.entrar()
  await frontend.procurar('b', true)
})
