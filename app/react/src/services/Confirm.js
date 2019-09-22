import React from 'react'
import { render } from 'react-dom'

import Confirm from '@/components/Confirm'

const select = () => {
  return document.querySelector(`div[data-modal-container='confirm']`)
}

const create = () => {
  const container = document.createElement('div')
  container.setAttribute('data-modal-container', 'confirm')
  return container
}

const init = (props = {}) => {
  const container = select() || create()
  document.body.appendChild(container)
  return render(<Confirm createConfirmProps={props}/>, container)
}

export default {
  show (props = {}) {
    return init({}).show(props)
  }
}
