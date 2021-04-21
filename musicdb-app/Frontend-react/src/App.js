import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faTrash,
  faEdit,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "./components/chart";
import BarExample from "./components/chart";
import ReactStars from "react-rating-stars-component";

library.add(fab, faCheckSquare, faCoffee, faTrash, faEdit, faMusic);

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

const exampleList = [
  { id: 1, name: "It's Time", artist: "Imagine Dragons", rating: 5 },
  { id: 2, name: "Jumpman", artist: "Drake", rating: 5 },
  { id: 3, name: "What's Next", artist: "Drake", rating: 4.5 },
  { id: 4, name: "Wavy", artist: "Sal Houdini", rating: 4.3 },
];

var songsList = exampleList;

function App(props) {
  const [showTrending, setShowTrending] = useState(false);
  const [viewSong, setViewSong] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newSong, setNewSong] = useState(false);
  const [songs, setSongs] = useState([]);
  const [username, setUsername] = useState("");
  const [viewSongState, setViewSongState] = useState({});
  const [rating, setRating] = useState(0)
  const toggleGraph = () => {
    setShowTrending(!showTrending);
  };

  const deleteSong = (songDetails) => {
    //logic to delete song from DB
    let config = {
      headers: {
        username: username,
        "song-id": songDetails.id,
      },
    };
    axios.get("/deleteSong/", config).then(fetchSongs());
  };

  const logOut = () => {
    axios
      .get("/logMeOut/")
      .then(function (response) {
        props.setLoggedIn(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const fetchSongs = () => {
    axios
      .get("/listAllSongs")
      .then(function (response) {
        let songsList = [];
        response.data.map((song) => {
          song.fields["id"] = song["pk"];
          songsList = [...songsList, song.fields];
        });
        setSongs(songsList);
      })
      .catch((err) => {
        console.log("error", err);
        songsList = exampleList;
      });
  };

  
  const getUsername = () => {
    axios.get("/getUsername").then(function (response) {
      setUsername(response.data);
    });
  };

  React.useEffect(() => {
    fetchSongs();
    getUsername();
  }, []);

  const editSong = (songDetails) => {
    setViewSongState(songDetails);

    toggleEditSong();

    // let data = { ...songDetails };
  };

  const onCreateSong = (songDetails) => {
    let config = {
      headers: {
        username: username,
      },
    };
    let data = { ...songDetails };

    // var songsList = [];

    axios
      .post("/createSong/", data, config)
      .then((response) => {
        fetchSongs();
      })
      .then(setNewSong(false));
  };

  const toggleEditSong = () => setShowEdit((prevState) => !prevState);

  const toggleViewSong = () => setViewSong((prevState) => !prevState);

  const ratingChanged = (newRating) => {

    console.log(newRating + "rating")
    setRating((oldState) => (newRating))
  }


  const rateSong = (id) => {
    let config = {
      headers: {
          'username': username,
          'song-id': id
        }
      }
    console.log("trying for user", username)
    console.log("trying for rating", rating)

    let data = {"rating": rating }

    axios.post('/updateRating/', data, config).then( function (response) {
      console.log("updated Rating")
       fetchSongs()
      })

    
  }
  const updateSong = (songDetails) => {
    let config = {
      headers: {
        "song-id": songDetails.id,
        username: username,
      },
    };

    axios
      .post(
        "/editSong/",
        {
          name: songDetails.name,
          artist: songDetails.artist,
          duration: songDetails.duration,
          year_of_release: songDetails.year_of_release,
        },
        config
      )
      .then((response) => {
        fetchSongs();
        toggleEditSong();
      });
  };
  return (
    <div className="flex flex-col text-white">
      <button
        onClick={() => logOut()}
        className="w-36 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Log Out
      </button>
      <h1 className="text-3xl my-7 text-center">
        {" "}
        <FontAwesomeIcon icon="music" /> Song Rater{" "}
      </h1>
      <div className="flex flex-row justify-center">
        <div className="m-5 p-5 rounded border-white border-2 w-3/4 max-w-xl">
          {songs.map((song) => {
            console.log(song)
            return (
              <ul>
                <li key={song.id}>
                  <div className="flex flex-row justify-between">
                    <h4>
                      {" "}
                      {song.name} - {song.artist}{" "}
                    </h4>
                    <div className="flex justify-between min-w-8 w-52">
                      <div onClick = {() => rateSong(song.id)}>
                    <ReactStars className = "focus:outline-none"
                        count={5}

                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        value = {parseInt(song.average_rating)}
                      />

                      </div>
                       

                      <button  className = "focus:outline-none" onClick={() => editSong(song)}>
                        <FontAwesomeIcon
                          className="fill-current text-gray-100 hover:text-gray-300 focus:outline-none"
                          icon="edit"
                        />
                      </button>
                      <button 
                        onClick={() => deleteSong(song)}
                        className="fill-current text-red-400 hover:text-red-800 focus:outline-none"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              // <Song {...song}> </Song>
            );
          })}
          <button
            onClick={() => setNewSong(true)}
            className="w-36 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            New Song
          </button>
          <button
            onClick={toggleGraph}
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          >
            {showTrending ? "Hide Trending Songs" : "What Songs Are Trending?"}
          </button>

          {showTrending && <BarExample />}
        </div>

        {showEdit && (
          <EditSong {...viewSongState} updateSongFunc={updateSong}></EditSong>
        )}

        {viewSong && (
          <ViewSong {...viewSongState} toggle={toggleViewSong}>
            {" "}
          </ViewSong>
        )}

        {newSong && <NewSong onCreateSong={onCreateSong}> </NewSong>}
      </div>
    </div>
  );
}

const Song = ({ name, artist, id }) => {
  return <></>;
};

const NewSong = ({ onCreateSong }) => {
  const [songDetails, setSongDetails] = useState({
    name: "",
    artist: "",
    rating: 0,
    year_of_release: 0,
    duration: 0,
  });

  return (
    <>
      <div className="m-5 p-5 rounded border-white border-2">
        <p className="my-2 text-white text-sm"> Title</p>
        <input
          type="text"
          onChange={(event) =>
            setSongDetails((prev_state) => ({
              ...prev_state,
              name: event.target.value,
            }))
          }
          className="text-black min-w-xl"
        />
        <p className="my-2 text-white text-sm"> Artist</p>
        <input
          type="text"
          onChange={(event) =>
            setSongDetails((prev_state) => ({
              ...prev_state,
              artist: event.target.value,
            }))
          }
          className="text-black min-w-xl"
        />
        <br />
        <p className="my-2 text-white text-sm"> Rating </p>
        <input
          type="number"
          onChange={(event) =>
            setSongDetails((prev_state) => ({
              ...prev_state,
              rating: event.target.value,
            }))
          }
          className="text-black min-w-xl"
        />
        <br />
        <p className="my-2 text-white text-sm"> Duration </p>
        <input
          type="number"
          onChange={(event) =>
            setSongDetails((prev_state) => ({
              ...prev_state,
              duration: event.target.value,
            }))
          }
          className="text-black min-w-xl"
        />
        <br />
        <p className="my-2 text-white text-sm"> Year Of Release </p>
        <input
          type="number"
          onChange={(event) =>
            setSongDetails((prev_state) => ({
              ...prev_state,
              year_of_release: event.target.value,
            }))
          }
          className="text-black min-w-xl"
        />
        <br />
        <button
          className="my-2 bg-blue-500 hover:bg-blue-700 w-36 rounded"
          onClick={() => {
            onCreateSong(songDetails);
          }}
        >
          Create Song
        </button>
      </div>
    </>
  );
};
const EditSong = ({
  id,
  name,
  artist,
  duration,
  year_of_release,
  rating,
  updateSongFunc,
}) => {
  const [editSongState, setEditSongState] = useState({
    name: name,
    artist: artist,
    year_of_release: year_of_release,
    duration: duration,
    id: id,
  });
  return (
    <>
      <div className="m-5 p-5 rounded border-white border-2">
        <p className="my-2 text-white text-sm"> Title</p>
        <input
          defaultValue={editSongState.name}
          className="text-black min-w-xl"
          onChange={(event) =>
            setEditSongState((prev_state) => ({
              ...prev_state,
              name: event.target.value,
            }))
          }
          type="text"
        />
        <p className="my-2 text-white text-sm"> Artist</p>
        <input
          onChange={(event) =>
            setEditSongState((prev_state) => ({
              ...prev_state,
              artist: event.target.value,
            }))
          }
          defaultValue={editSongState.artist}
          className="text-black min-w-xl"
          type="text"
        />
        <br />
        <p className="my-2 text-white text-sm"> Duration</p>

        <input
          onChange={(event) =>
            setEditSongState((prev_state) => ({
              ...prev_state,
              duration: event.target.value,
            }))
          }
          defaultValue={editSongState.duration}
          className="text-black min-w-xl"
          type="text"
        />
        <br />
        <p className="my-2 text-white text-sm"> Year Of Release</p>

        <input
          onChange={(event) =>
            setEditSongState((prev_state) => ({
              ...prev_state,
              year_of_release: event.target.value,
            }))
          }
          defaultValue={editSongState.year_of_release}
          className="text-black min-w-xl"
          type="text"
        />
        <br />
        <button
          className="my-2 bg-blue-500 hover:bg-blue-700 w-36 rounded"
          onClick={() => updateSongFunc(editSongState)}
        >
          {" "}
          Update{" "}
        </button>
      </div>
    </>
  );
};

const ViewSong = ({ id, name, artist, rating, toggle }) => {
  return (
    <>
      <div className="m-5 p-5 rounded border-white border-2">
        <p className="my-2 text-white text-bold text-xl"> {name}</p>
        <p className="my-2 text-white text-sm"> {artist}</p>
        <p className="my-2 text-white text-sm"> {rating}</p>
        <p className="my-2 text-white text-md"> Rate it</p>
        <input className="text-black" type="number" />
        <button onClick={toggle}> Close</button>
      </div>
    </>
  );
};

export default App;
