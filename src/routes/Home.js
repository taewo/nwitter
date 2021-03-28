import { useState } from 'react'
import { dbService } from 'fbase'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const onChange = (e) => {
    const { target: { value }} = e
    setNweet(value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await dbService.collection('nweets').add({
      nweet,
      createdAt: Date.now()
    })
    console.log(result)
    setNweet('')
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