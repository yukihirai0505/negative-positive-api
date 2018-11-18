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
    const positiveTopThree = result && result.sort((a, b) => {
      const alabels = a[1][0]
      const blabels = b[1][0]
      const aVal = alabels.filter(arr => arr[0] === '__label__1,')[0][1]
      const bVal = blabels.filter(arr => arr[0] === '__label__1,')[0][1]
      return bVal - aVal
    }).slice(0, 10)
    const negativeTopThree = result && result.sort((a, b) => {
      const alabels = a[1][0]
      const blabels = b[1][0]
      const aVal = alabels.filter(arr => arr[0] === '__label__2,')[0][1]
      const bVal = blabels.filter(arr => arr[0] === '__label__2,')[0][1]
      return bVal - aVal
    }).slice(0, 10)
    console.dir(positiveTopThree)
    console.dir(negativeTopThree)
    return (
      <div>
        <div onClick={this.clickScreen}>
          <button className="square_btn" onClick={handleSignOut}>
            ログアウト
          </button>
        </div>
        <p>ポジティブツイートトップ10</p>
        {positiveTopThree && positiveTopThree.map(data => {
          const text = data[0]
          const labels = data[1][0]
          return (<div>
            {labels[0]}
            {text}
          </div>)
        })}
        <p>ネガティブツイートトップ10</p>
        {negativeTopThree && negativeTopThree.map(data => {
          const text = data[0]
          const labels = data[1][0]
          return (<div>
            {labels[0]}
            {text}
          </div>)
        })}
      </div>
    )
  }
}

export default Result
