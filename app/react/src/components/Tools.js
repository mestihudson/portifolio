import React from 'react'

import Tool from '@/components/Tool'

export default class Tools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      criterio: '',
      tags: false
    }
  }

  onToolRemove = (e) => {
    this.props.onRemove(e)
  }

  onCriterioKeyUp = (e) => {
    this.setState({ criterio: e.target.value })
  }

  onTagsClick = () => {
    const tags = !this.state.tags
    this.setState({ tags })
  }

  onAddClick = () => {
    this.props.onAdd()
  }

  render () {
    const criterio = this.state.criterio.trim()
    const tags = this.state.tags
    const tools = this.props.tools
      .filter(tool => {
        return criterio === '' ||
          (!tags && tool.title.includes(criterio)) ||
          (tags && tool.tags.some((tag) => tag.includes(criterio)))
      })
      .map((tool, index) =>
        <Tool tool={tool} key={index} onRemove={this.onToolRemove}/>
      )
    return (
      <div>
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <div className="row">
              <div className="col-sm-6 form-inline">
                <div className="inner-addon left-addon">
                  <i className="glyphicon glyphicon-search"/>
                  <input
                    className="form-control criterio"
                    type='text'
                    placeholder='search'
                    data-input='criterio'
                    onKeyUp={this.onCriterioKeyUp}
                  />
                </div>
              </div>
              <div className="col-sm-4 form-inline">
                <div className="checkbox">
                  <label>
                    <input
                      type='checkbox'
                      data-input='tags'
                      onClick={this.onTagsClick}
                    />
                    search in tags only
                  </label>
                </div>
              </div>
              <div className="col-sm-2">
                <button
                  className="btn btn-default btn-md pull-right"
                  action-trigger='nova'
                  onClick={this.onAddClick}
                >
                  <span
                    className="glyphicon glyphicon-plus"
                    aria-hidden='true'
                  />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        {tools}
      </div>
    )
  }
}

