import { useState, useEffect } from 'react'
import { dbService } from 'fbase'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  useEffect(() => {
    getNweets()
  }, [])

  const onChange = (e) => {
    const { target: { value }} = e
    setNweet(value)
  }

  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get()
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id
      }
      setNweets((prev) => [nweetObject, ...prev])
    })
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid
    })
    setNweet('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind" maxLength={120} value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home