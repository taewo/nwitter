import firebase from '../firebase'
import Profile from '../routes/Profile'
import AppRouter from './Router'

function App() {
  console.log('firebase--', firebase)
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
