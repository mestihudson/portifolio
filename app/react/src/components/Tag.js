import React from 'react'

export default class Tag extends React.Component {
  render () {
		return (
			<strong>#{this.props.tag} </strong>
		)
	}
}

