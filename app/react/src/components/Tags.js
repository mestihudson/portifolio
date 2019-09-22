import React from 'react'

import Tag from '@/components/Tag'

export default class Tags extends React.Component {
  render () {
    const tags = this.props.tags.map(tag =>
      <Tag tag={tag} key={tag.toString()}/>
    )
    return (
      <div
        className="col-sm-12"
        data-set='tags'
      >{tags}</div>
    )
  }
}

