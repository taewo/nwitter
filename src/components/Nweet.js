import { useState } from 'react'
import { dbService } from 'fbase'

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const [attachment, setAttachment] = useState(null)

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete()
    }
  }
  const toggleEditing = () => setEditing(prev => !prev)
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(111, newNweet)
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet
    })
    toggleEditing()
  }
  const onChange = (e) => {
    const { target: { value }} = e
    setNewNweet(value)
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
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Edit your nweet" value={newNweet} required />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Update Nweet" />
            {attachment && (
              <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
            )}
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
        )
      }
    </div>
  )
}

export default Nweet