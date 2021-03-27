import { useState } from 'react'
import { authService, firebaseInstance } from 'fbase'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')
  const onChange = (e) => {
    const { target: { name, value }}  = e
    e.preventDefault()
    if (name === 'email') {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      let data
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (e) {
      console.log(e)
      setError(e.message)
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev)
  const onSocialClick = async (e) => {
    const { target: { name } } = e
    let provider
    if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    } else if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    }
    const data = authService.signInWithPopup(provider)
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name='email' value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} required />
        <input type="submit" value={newAccount ? 'Create Account': 'Sign in'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth