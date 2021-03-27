import { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onChange = (e) => {
    const { target: { name, value }}  = e
    e.preventDefault()
    console.log(1, name, value)
    if (name === 'email') {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name='email' value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} required />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Githun</button>
      </div>
    </div>
  )
}

export default Auth