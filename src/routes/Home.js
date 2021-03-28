import { useState, useEffect } from 'react'
import { dbService } from 'fbase'
import Nweet from 'components/Nweet'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      console.log('something happend')
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNweets(nweetArray)
    })
  }, [])

  const onChange = (e) => {
    const { target: { value }} = e
    setNweet(value)
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
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home