import React, { useState }from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import { storage, db } from './firebase';
import './ImageUpload.css';

function ImageUpload(username) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.file[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = (e) => {
    const uploadTask = storage
      .ref(`images/${image.name}`)
      .put(image);

     uploadTask.on(
      "state_changed",
      (snapshot) => {

        // progress function: how long is this process going to take (visual)
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {

        // error function: if anything goes wrong let me know
        console.log(error);
        alert(error.message);
      },
      () => {

        // complete function: go grab url
        storage
          .ref("image")
          .child(image.name)
          .getDownloadURL()
          .then(url => {

            // post the image inside the database
            db.collection("post").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });

            // resets everything, clean the slate for next post
            setProgress(0)
            setCaption("");
            setImage(null);
          })
      }
     )

  }

  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />

      <input 
        type="text" 
        placeholder='Enter a caption...' 
        onChange={event => setCaption(event.target.value)}value={''}/>

      <input 
        type="file" 
        onChange={handleChange} />

      <Button 
        onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
