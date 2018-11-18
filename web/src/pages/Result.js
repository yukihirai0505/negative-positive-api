import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Result extends Component {
  static propTypes = {
    handleSignOut: PropTypes.any,
    result: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {

  }


  render() {
    const { handleSignOut, result } = this.props
    console.log(result)
    return (
      <div>
        <div onClick={this.clickScreen}>
          <button className="square_btn" onClick={handleSignOut}>
            ログアウト
          </button>
        </div>
        {result && result.map(data => {
          const text = data[0]
          const labels = data[1]
          console.dir(labels)
          return (<div>
            {text.slice(0, 30)}
            {labels[0]}
          </div>)
        })}
      </div>
    )
  }
}

export default Result
