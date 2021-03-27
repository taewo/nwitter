import { useState } from 'react'
import { authService } from 'fbase'
import Profile from 'routes/Profile'
import AppRouter from './Router'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
