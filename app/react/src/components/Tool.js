import React from 'react'

import Tags from '@/components/Tags'

export default class Tool extends React.Component {
  onRemoveClick = () => {
    this.props.onRemove(this.props.tool)
  }

  render () {
    const tool = { ...this.props.tool }
    return (
      <div className="row" data-set='ferramenta'>
        <div className="col-sm-10 col-sm-offset-1">
          <div className="panel panel-default">
            <div className="row">
              <div className="col-sm-10">
                <span data-set='link' href={tool.link}>
                  <h4 data-set='title'>{tool.title}</h4>
                </span>
              </div>
              <div className="col-sm-2">
                <button
                  className="btn btn-default btn-md pull-right"
                  action-trigger='remover'
                  onClick={this.onRemoveClick}
                >
                  <span
                    className="glyphicon glyphicon-remove"
                    aria-hidden="true"
                  />
                  Remove
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <p data-set='description'>{tool.description}</p>
              </div>
            </div>
            <div className="row">
              <Tags tags={tool.tags}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

