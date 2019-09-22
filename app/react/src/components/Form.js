import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tool: {
        title: '',
        link: '',
        description: '',
        marcadores: ''
      }
    }
  }

  attrKeyUp = (key, e) => {
    const tool = { ...this.state.tool }
    tool[key] = e.target.value
    this.setState({ tool })
  }

  onTitleKeyUp = (e) => {
    this.attrKeyUp('title', e)
  }

  onLinkKeyUp = (e) => {
    this.attrKeyUp('link', e)
  }

  onDescriptionKeyUp = (e) => {
    this.attrKeyUp('description', e)
  }

  onMarcadoresKeyUp = (e) => {
    this.attrKeyUp('marcadores', e)
  }

  onConfirmClick = () => {
    this.props.onConfirm(this.state.tool)
  }

  render () {
    const { show } = this.props
    return(
      show &&
      <div>
        <fieldset className="form-group">
          <label>Tool Name</label>
          <input
            className="form-control"
            type='text'
            data-input='title'
            onKeyUp={this.onTitleKeyUp}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Tool Link</label>
          <input
            className="form-control"
            type='text'
            data-input='link'
            onKeyUp={this.onLinkKeyUp}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Tool Description</label>
          <textarea
            className="form-control"
            data-input='description'
            rows='5'
            onKeyUp={this.onDescriptionKeyUp}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Tags</label>
          <input
            className="form-control"
            type='text'
            data-input='marcadores'
            onKeyUp={this.onMarcadoresKeyUp}
          />
        </fieldset>
        <fieldset className="form-group">
          <button
            className="btn btn-default pull-right"
            action-trigger='adicionar'
            onClick={this.onConfirmClick}
          >Add Tool</button>
        </fieldset>
      </div>
    )
  }
}
