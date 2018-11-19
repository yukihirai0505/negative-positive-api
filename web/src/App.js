import React, { Component } from 'react'
import { auth, providerTwitter } from './config/firebase'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import { apiBaseUrl } from './config/app'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      result: []
    }
  }

  async fetchDiagnosis(user, idToken) {
    const response = await fetch(`${apiBaseUrl}/users/diagnosis`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        idToken: idToken
      })
    })
    const text = await response.text()
    const { data: result } = JSON.parse(text)
    this.setState({
      user,
      result
    })
  }

  async componentDidMount() {
    // User
    auth.onAuthStateChanged(async user => {
      const idToken = await user.getIdToken()
      await this.fetchDiagnosis(user, idToken)
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
      await fetch(`${apiBaseUrl}/users`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          idToken: idToken,
          accessToken: credential.accessToken,
          secret: credential.secret
        })
      })
      await this.fetchDiagnosis(user, idToken)
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
      <Dashboard
        handleSignOut={this.handleSignOut}
        result={this.state.result}
      />
    ) : (
      <SignIn handleLogin={this.handleLogin}/>
    )
  }
}

export default App
