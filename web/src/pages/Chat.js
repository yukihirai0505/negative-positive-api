import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Chat.css'
import { getPhotoURL, getUserName } from '../utils/auth'
import { database } from '../config/firebase'
import moment from 'moment-timezone'
import Message from '../components/Message'

class Chat extends Component {
  static propTypes = {
    handleSignOut: PropTypes.any
  }

  constructor(props) {
    super(props)
    this.state = {
      position: {
        x: undefined,
        y: undefined
      },
      messages: []
    }
  }

  async componentDidMount() {
    const callback = snap => {
      const { messages } = this.state
      let data = snap.val()
      this.setState({
        messages: messages.concat([data])
      })
    }
    database
      .ref('/messages/')
      .limitToLast(100)
      .on('child_added', callback)
    database
      .ref('/messages/')
      .limitToLast(100)
      .on('child_changed', callback)
  }

  clickScreen = e => {
    this.setState({
      position: {
        x: e.pageX,
        y: e.pageY
      }
    })
  }

  inputBtn = e => {
    e.stopPropagation()
  }

  sendMessage = e => {
    const { position } = this.state
    if (e.keyCode === 13) {
      let message = document.getElementById('message')
      database.ref('/messages/').push({
        name: getUserName(),
        text: message.value,
        profilePicUrl: getPhotoURL(),
        x: position.x,
        y: position.y,
        time: moment()
          .tz('Asia/Tokyo')
          .unix()
      })
      message.value = ''
      this.setState({
        position: {
          x: undefined,
          y: undefined
        }
      })
    }
  }

  render() {
    const { position, messages } = this.state
    let hasPosition = position && position.x && position.y
    return (
      <div className="chat" onClick={this.clickScreen}>
        <button className="square_btn" onClick={this.props.handleSignOut}>
          ログアウト
        </button>
        <div id="cloud" />
        {messages.map((message, key) => (
          <Message
            key={key}
            profilePicUrl={message.profilePicUrl}
            name={message.name}
            x={message.x}
            y={message.y}
            html={<p>{message.text}</p>}
          />
        ))}
        {hasPosition && (
          <Message
            profilePicUrl={getPhotoURL()}
            name={getUserName()}
            x={position.x}
            y={position.y}
            html={
              <input
                autoFocus
                id="message"
                onClick={this.inputBtn}
                onKeyUp={this.sendMessage}
              />
            }
          />
        )}
      </div>
    )
  }
}

export default Chat
