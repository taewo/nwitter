import { useState } from 'react'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const onChange = (e) => {
    const { target: { value }} = e
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind" maxLength={120} value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  )
}

export default Home