import React from 'react'

const defaultProps = {
  title: '',
  body: '',
  onClose: () => {}
}

export default class Modal extends React.Component {
  constructor (props = {}) {
    super(props)
  }

  onDismissClick = () => {
    (this.props.onClose || defaultProps.onClose)()
  }

  keyDown = (e) => {
    if (e.keyCode === 27) {
      this.onDismissClick()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.keyDown, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.keyDown, false)
  }

  render () {
    const { visible, title, body } = this.props
    return (
      visible &&
      <>
        <div
          className="modal-backdrop fade in"
        ></div>
        <article
          className="modal fade in data-set-modal"
          tabIndex="-1"
          role="dialog"
          style={{display: 'block'}}
          data-set="modal"
        >
          <div
            className="modal-dialog"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h4
                  className="modal-title pull-left"
                  data-set="modal-title"
                >{title || defaultProps.title}</h4>
                <button
                  type="button"
                  className="close pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onDismissClick}
                  action-trigger="dismiss"
                ><span aria-hidden="true">&times;</span></button>
              </div>
              <div
                className="modal-body"
                data-set="modal-body"
              >{body || defaultProps.body}</div>
            </div>
          </div>
        </article>
      </>
    )
  }
}

