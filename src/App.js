import React, { useState, useEffect }from 'react';
import './App.css'
import Post from './Post'
import { auth, db } from './firebase'
import { useStyles, getModalStyle } from './ModalStyles'
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

// Hooks
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // useEffect  -> Runs a piece of code based on a specific condition
  // if [] blank will run once with the page loads and not NEVER again: ONE AND DONE
  // if [posts] will run this effect every single time posts change
  // snapshot is a powerful listener that will take a snapshot of every new change on firebase collection

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // logged out
        setUser(null);
      }
    })

    return () => {
      //preform some clean up action (unsubscribe listener)
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    // most recent photo is going to show at the top with ORDER BY timestamp, decending
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // code fires here and will update code
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    
    setOpenSignIn(false);
  }

  // Need to fix modal placement: possibly in the material styling on line 10
  return (

    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signUp">
            <center>
            <img
              className="app__headerImage"
              src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
              alt=""
            />

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
    
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button onClick={signUp}>Sign Up</Button>
            </center>
          </form>
        </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signUp">

            <img
              className="app__headerImage"
              src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
              alt=""
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          alt=""
        />
        {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>
      
      <h1>Hello, World!</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ): (
        <h3> Sorry, you need to login to upload</h3>
      )}

      <Post username="danilion.1111" caption="Hello Puppy!" imageUrl="https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
      <Post username="jon.crosby" caption="Cute Little Puppy!" imageUrl="https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60"/>
      <Post username="llxxkkyyBoi" caption="Old Friend!" imageUrl="https://images.unsplash.com/photo-1455103493930-a116f655b6c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
      <Post username="egan.ashenfelter" caption="Boop!" imageUrl="https://images.unsplash.com/photo-1601758123927-4f7acc7da589?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
      
    </div>
  );
}

export default App;
