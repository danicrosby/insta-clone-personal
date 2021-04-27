import React, { useState, useEffect }from 'react';
import './App.css'
import Post from './Post'
import { db } from './firebase'

function App() {
  const [posts, setPosts] = useState([
    {
      username: "danilion.1111",
      caption: "Hello Puppy!",
      imageUrl: "https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      username: "jon.crosby",
      caption: "Cute Little Puppy!",
      imageUrl: "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60"
    },
  ]);

  // useEffect  -> Runs a piece of code based on a specific condition
  // if [] blank will run once with the page loads and not NEVER again: ONE AND DONE
  // if [posts] will run this effect every single time posts change
  // snapshot is a powerful listener that will take a snapshot of every new change on firebase collection
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      // code fires here and will update code
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])
  
  

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          alt=""
        />
      </div>

      <h1>Hello, World!</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={posts.username} caption={posts.caption} imageUrl={posts.imageUrl} />
        ))
      }

      <Post username="danilion.1111" caption="Hello Puppy!" imageUrl="https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
      <Post username="jon.crosby" caption="Cute Little Puppy!" imageUrl="https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGRvZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60"/>
      <Post username="llxxkkyyBoi" caption="Old Friend!" imageUrl="https://images.unsplash.com/photo-1455103493930-a116f655b6c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
      <Post username="egan.ashenfelter" caption="Boop!" imageUrl="https://images.unsplash.com/photo-1601758123927-4f7acc7da589?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGRvZ3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
      
    </div>
  );
}

export default App;
