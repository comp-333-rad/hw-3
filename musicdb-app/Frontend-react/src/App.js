import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faTrash, faEdit, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chart from './components/chart'
import BarExample from './components/chart';

library.add(fab, faCheckSquare, faCoffee, faTrash, faEdit, faMusic)

// path('editSong/', views.editSong, name="editSong"),
// path('songsByUser/', views.retrieveSongsByUser, name="songsByUser"),
// path('listAllSongs/', views.retrieveAllSongs, name="listAllSongs"),
// path('deleteSong/', views.deleteSong, name="deleteSong"),
// path('createSong/', views.createSong, name="createSong"),
// path('updateRating/', views.updateRating, name="updateRating"),
// path('login/', views.loginPage, name="loginPage"),
// path('register/', views.registerPage, name="registerPage"),
// path('logMeIn/', views.logMeIn, name="logMeIn"),
// path('createUser/', views.createUser, name="createUser"),

const songsList = [
  { "id": 1, "name": "It's Time", "artist": "Imagine Dragons", "rating": 5, },
  { "id": 2, "name": "Jumpman", "artist": "Drake", "rating": 5 },
  { "id": 3, "name": "What's Next", "artist": "Drake", "rating": 4.5 },
  { "id": 4, "name": "Wavy", "artist": "Sal Houdini", "rating": 4.3 }]


function App() {


  const [showTrending, setShowTrending] = useState(false)
  const [viewSong, setViewSong] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [newSong, setNewSong] = useState(false)

  const [viewSongState, setViewSongState] = useState({})
  const toggleGraph = () => { setShowTrending(!showTrending) }

  const deleteSong = (songDetails) => {
    //logic to delete song from DB
    // React.useEffect( () => {
      let config = {
        headers: {
          'username': songDetails.username,
          'song-id': songDetails.id
        }
      }
      
      let data = {
      }
      var songsList = []
  
      axios.get(URL, data, config).then( data => songsList = data)
      
      console.log(data)
  
  
    }
    // )
  

  React.useEffect( () => {
    let config = {
      headers: {
        'username': 'rsiddiqui',
      }
    }
    
    let data = {
    }
    var songsList = []

    axios.get(URL, data, config).then( data => songsList = data)
    
    console.log(data)


  }
  )


  const editSong = (songDetails) => {

    
    setViewSongState(songDetails)
    let config = {
      headers: {
        "song-id": songDetails.id,
        "username": songDetails.username
      }
    }
    
    let data = {...songDetails}
      
    axios.get(URL, data, config).then(setShowEdit(true))

  }

  const onCreateSong = (songDetails) => {
    let config = {
      headers: {
        'username': songDetails.username,
      }
    }
    
    let data = {...songDetails}
      
    
    var songsList = []

    axios.post(URL, data, config).then(setNewSong(false))
    
   
  }

  const toggleEditSong = () => setShowEdit(false)

  const toggleViewSong = () => setViewSong(false)

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-3xl my-7 text-center"> <FontAwesomeIcon icon="music" /> Song Rater </h1>
      <div className="flex flex-row justify-center">
        <div className="m-5 p-5 rounded border-white border-2 w-3/4 max-w-xl" >

          {songsList.map(song => {
            return (
              <ul>
              <li key={song.name}>
                <div className="flex flex-row justify-between">
                  <h4> {song.name} - {song.artist} </h4>
                  <div className="flex justify-between min-w-8">
                    <button onClick={() => editSong(song)}>
                      <FontAwesomeIcon className="fill-current text-gray-100 hover:text-gray-300" icon="edit" />
                    </button>
                    <button onClick={() => deleteSong(song.id)} className="fill-current text-red-400 hover:text-red-800">
                      <FontAwesomeIcon icon="trash" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
              // <Song {...song}> </Song>

            )
          })}
          <button onClick={() => setNewSong(true)} className="w-36 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">New Song</button>
          <button onClick={toggleGraph} className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">

            {showTrending ? "Hide Trending Songs" : "What Songs Are Trending?"}
          </button>

          {showTrending && <BarExample />}

        </div>




        {showEdit && <EditSong {...viewSongState} toggle={toggleEditSong}> </EditSong>}

        {viewSong && <ViewSong {...viewSongState} toggle={(toggleViewSong)}> </ViewSong>}

        {newSong && <NewSong onCreateSong={onCreateSong}> </NewSong>}

      </div>

    </div>
  )
}

const Song = ({ name, artist, id  }) => {

  return (
    <>
   
    </>
  )
}

const NewSong = ({ onCreateSong }) => {
  const [songDetails, setSongDetails] = useState({'name': '', 'artist': '', 'rating': 0, 'year_of_release': 0, 'duration': 0 })


  return (
    <>
      <div className="m-5 p-5 rounded border-white border-2">
        <p className="my-2 text-white text-sm"> Title</p>
        <input type = "text" onChange = {(event) => setSongDetails({name: event.target.value})} className="text-black min-w-xl" />
        <p className="my-2 text-white text-sm"> Artist</p>
        <input type = "text" onChange = {(event) => setSongDetails({artist: event.target.value})} className="text-black min-w-xl" />
        <br />
        <p className="my-2 text-white text-sm"> Rating </p>
        <input type = "number" onChange = {(event) => setSongDetails({rating: event.target.value})} className="text-black min-w-xl"  />
        <br />

          <p className="my-2 text-white text-sm"> Duration </p>
        <input type = "number" onChange = {(event) => setSongDetails({duration: event.target.value})} className="text-black min-w-xl"  />
        <br />
        <p className="my-2 text-white text-sm"> Year Of Release </p>
        <input type = "number" onChange = {(event) => setSongDetails({year_of_release: event.target.value})} className="text-black min-w-xl"  />
        <br />
        <button className="my-2 bg-blue-500 hover:bg-blue-700 w-36 rounded" onClick={onCreateSong(songDetails)}> Create Song </button>

      </div>
    </>
  )
}
const EditSong = ({ id, name, artist, toggle }) => {
  return (
    <>
      <div className="m-5 p-5 rounded border-white border-2">
        <p className="my-2 text-white text-sm"> Title</p>
        <input defaultValue={name} className="text-black min-w-xl" type="text" />
        <p className="my-2 text-white text-sm"> Artist</p>
        <input defaultValue={artist} className="text-black min-w-xl" type="text" />
        <br />
        <button className="my-2 bg-blue-500 hover:bg-blue-700 w-36 rounded" onClick={toggle}> Update </button>

      </div>
    </>
  )

}

const ViewSong = ({ id, name, artist, rating, toggle }) => {
  return (
    <>
      <div className="m-5 p-5 rounded border-white border-2">
        <p className="my-2 text-white text-bold text-xl"> {name}</p>
        <p className="my-2 text-white text-sm"> {artist}</p>
        <p className="my-2 text-white text-sm"> {rating}</p>
        <p className="my-2 text-white text-md"> Rate it</p>
        <input className="text-black" type="number" />
        <button onClick={toggle} > Close</button>
      </div>

    </>
  )


}

export default App;
