import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message extends Component {
  static propTypes = {
    profilePicUrl: PropTypes.string,
    name: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    html: PropTypes.element
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  render() {
    return (
      <div
        className="message"
        style={{
          position: 'absolute',
          left: this.props.x,
          top: this.props.y
        }}
      >
        <a href="http://twitter.com/" target="_blank">
          <div className="faceicon">
            <img src={this.props.profilePicUrl} alt="" />
          </div>
        </a>
        <div className="chatting">
          <div className="says">{this.props.html}</div>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
          <a href="http://twitter.com/" target="_blank">
            {this.props.name}
          </a>
        </span>
      </div>
    )
  }
}

export default Message
