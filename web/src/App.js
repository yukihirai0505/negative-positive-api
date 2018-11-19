import React, { Component } from 'react'
import { auth, providerTwitter } from './config/firebase'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import { apiBaseUrl } from './config/app'
import CircularIndeterminate from './atoms/CircularIndeterminate'

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
      result
    })
  }

  async componentDidMount() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const idToken = await user.getIdToken()
        this.setState({ user })
        await this.fetchDiagnosis(user, idToken)
      }
    })
    const result = await auth.getRedirectResult().catch(error => {
      console.log('redirect result', error)
    })
    const { user, credential } = result
    if (user && credential) {
      const idToken = await user.getIdToken()
      await fetch(`${apiBaseUrl}/users`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          idToken: idToken,
          accessToken: credential.accessToken,
          secret: credential.secret
        })
      })
    }
  }

  handleLogin = e => {
    e.preventDefault()
    localStorage.setItem('isLoading', '1')
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
    const { user, result } = this.state
    return user ? (
      <Dashboard
        handleSignOut={this.handleSignOut}
        result={result}
      />
    ) : (
      <SignIn handleLogin={this.handleLogin}/>
    )
  }
}

export default App
