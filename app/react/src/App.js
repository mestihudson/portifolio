import React from 'react'

import '@/App.css'

import api from '@/services/api'
import Confirm from '@/services/Confirm'

import Tools from '@/components/Tools'
import Form from '@/components/Form'
import Modal from '@/components/Modal'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      tools: []
    }
  }

  componentDidMount() {
    api.getTools()
      .then(tools => {
        this.setState({ tools })
      })
  }

  onFormConfirm = (e) => {
    const tags = (e.marcadores || '').split(' ')
    const tool = { ...e, tags }
    delete tool.marcadores
    api.createTool(tool)
      .then(tool => {
        const before = this.state.tools
        const after = [ ...before, tool ]
        this.setState({ tools: after })
        this.onModalClose()
      })
  }

  onToolRemove = (tool) => {
    Confirm.show({
      title: 'Remove Tool',
      body: 'Are you sure remove tool?',
      okText: 'Yes, remove'
    })
      .then(result => {
        if (result) {
          api.removeTool(tool.id)
            .then(() => {
              const before = this.state.tools
              const after = before.filter(t => t.id !== tool.id)
              this.setState({ tools: after })
            })
        }
      })
  }

  onToolAdd = () => {
    this.setState({ show: true })
  }

  onModalClose = () => {
    this.setState({ show: false })
  }

  render () {
    const { show, tools } = this.state
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <h1>VUTTR</h1>
            <h3>Very Useful Tools to Remember</h3>
          </div>
        </div>
        <Tools
          tools={tools}
          onAdd={this.onToolAdd}
          onRemove={this.onToolRemove}
        />
        <Modal
          visible={show}
          onClose={this.onModalClose}
          title="+ Add new tool"
          body={<Form show={true} onConfirm={this.onFormConfirm}/>}
        />
      </div>
    )
  }
}

