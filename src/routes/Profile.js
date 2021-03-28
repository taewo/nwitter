import { useEffect } from 'react'
import { authService, dbService } from 'fbase'
import { useHistory } from 'react-router-dom'

const Profile = ({ userObj }) => {
  const history = useHistory()
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
  return (
    <div>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  )
}

export default Profile