import { useState, useEffect } from 'react'
import { authService, dbService } from 'fbase'
import { useHistory } from 'react-router-dom'

const Profile = ({ userObj }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  useEffect(() => {
    getMyNweets()
  }, [])

  const onLogOutClick = () => {
    authService.signOut()
    history.push('/')
  }

  const getMyNweets = async () => {
    const nweets = await dbService.collection('nweets').where('creatorId', '==', userObj.uid).orderBy('createdAt').get()
    console.log(nweets.docs.map(doc => doc.data()))
  }

  const onChange = (e) => {
    const { target: { value }} = e
    setNewDisplayName(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      })
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  )
}

export default Profile