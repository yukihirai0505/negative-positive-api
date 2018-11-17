import React, { Component } from 'react'
import { auth, providerTwitter } from './config/firebase'
import SignIn from './pages/SignIn'
import Chat from './pages/Chat'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined
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
    const user = result.user
    if (user) {
      this.setState({ user })
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
      <Chat handleSignOut={this.handleSignOut} />
    ) : (
      <SignIn handleLogin={this.handleLogin} />
    )
  }
}

export default App
