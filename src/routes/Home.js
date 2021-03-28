import { useState, useEffect } from 'react'
import { dbService, storageService } from 'fbase'
import { v4 as uuidv4 } from "uuid";
import Nweet from 'components/Nweet'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState(null)

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setNweets(nweetArray)
    })
  }, [])

  const onChange = (e) => {
    const { target: { value }} = e
    setNweet(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let attachmentUrl = ''
    if (attachment !== '') {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const response = await fileRef.putString(attachment, 'data_url')
      attachmentUrl = await response.ref.getDownloadURL()
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await dbService.collection('nweets').add(nweetObj)
    setNweet('')
    setAttachment('')
  }

  const onFileChange = (e) => {
    const { target: { files } } = e
    const theFile = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(theFile)
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent
      setAttachment(result)
    }
  }

  const onClearAttachment = () => setAttachment(null)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind" maxLength={120} value={nweet} onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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