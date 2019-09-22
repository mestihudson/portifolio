import React from 'react'

let resolve

const defaultProps = {
  title: 'Title',
  body: 'Body',
  okText: 'Ok',
  cancelText: 'Cancel'
}

export default class Confirm extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false,
      showConfirmProps: {}
    }
    this.buttonOk = null
  }

  componentDidMount () {
    document.addEventListener("keydown", this.keyDown, false)
    if (this.buttonOk) {
      this.buttonOk.focus()
    }
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.keyDown, false)
  }

  keyDown = (e) => {
    if (e.keyCode === 13) {
      this.onOkClick()
    }
    if (e.keyCode === 27) {
      this.onCancelClick()
    }
  }

  onOkClick = () => {
    this.setState({ visible: false })
    resolve(true)
  }

  onCancelClick = () => {
    this.setState({ visible: false })
    resolve(false)
  }

  show = (props ={}) => {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props }
    this.setState({ visible: true, showConfirmProps })
    return new Promise(status => {
      resolve = status
    })
  }

  render () {
    const { visible, showConfirmProps } = this.state
    const { title, body, okText, cancelText } = showConfirmProps
    return (
      visible &&
      <>
        <div className="modal-backdrop fade in"></div>
        <div
          className="modal fade in data-set-confirm"
          id="exampleModal" tabIndex="-1" role="dialog"
          style={{display: 'block'}}
          onClick={this.onCancelClick}
          data-set="confirm"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title pull-left"
                  data-set='title'
                >{title || defaultProps.title}</h5>
                <button
                  type="button pull-right"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onCancelClick}
                  action-trigger="dismiss"
                ><span aria-hidden="true">&times;</span></button>
              </div>
              <div
                className="modal-body"
                data-set='body'
              >{body || defaultProps.body}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.onCancelClick}
                  action-trigger='cancelText'
                >{cancelText || defaultProps.cancelText}</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onOkClick}
                  ref={element => this.buttonOk = element}
                  autoFocus
                  action-trigger='okText'
                >{okText || defaultProps.okText}</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

