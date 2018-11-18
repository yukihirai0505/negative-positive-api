import React, { Component } from 'react'
import { auth, providerTwitter } from './config/firebase'
import SignIn from './pages/SignIn'
import Result from './pages/Result'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      result: []
    }
  }

  async componentDidMount() {
    // User
    auth.onAuthStateChanged(user => {
      this.setState({ user })
    })
    const result = await auth.getRedirectResult().catch(error => {
      console.log('redirect result', error)
    })
    const { user, credential } = result
    if (user && credential) {
      const idToken = await user.getIdToken()
      console.log(`================ accessToken ================`)
      console.log(credential.accessToken)
      console.log(`================ secret ================`)
      console.log(credential.secret)
      console.log(`================ idToken ================`)
      console.log(idToken)
      const response = await fetch('http://localhost:5000/diagnosis', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          accessToken: credential.accessToken,
          secret: credential.secret
        })
      })
      const text = await response.text()
      const { data: result } = JSON.parse(text)
      this.setState({
        user,
        result
      })
    }
  }

  handleLogin = e => {
    e.preventDefault()
    auth.signInWithRedirect(providerTwitter)
  }

  handleSignOut = () => {
    auth
      .signOut()
      .then(result => {
        this.setState({ user: undefined })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { user } = this.state
    return user ? (
      <Result handleSignOut={this.handleSignOut} result={this.state.result}/>
    ) : (
      <SignIn handleLogin={this.handleLogin}/>
    )
  }
}

export default App
