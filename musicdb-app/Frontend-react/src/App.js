import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faTrash, faEdit, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab, faCheckSquare, faCoffee, faTrash, faEdit, faMusic)


function App() {

const songsList = [
  {"name": "It's Time", "artist": "Imagine Dragons", "rating": 5, },
  {"name": "Jumpman", "artist": "Drake", "rating": 5},
  {"name": "What's Next", "artist": "Drake", "rating": 4.5},
  {"name": "Wavy", "artist": "Sal Houdini", "rating": 4.3}]

  return (
    
    <div className = "flex flex-col text-white">
          <h1 className = "text-3xl my-7 text-center"> <FontAwesomeIcon icon="music"/> Song Rater </h1>
  <div className = "flex flex-row justify-center"> 
        <div className = "m-5 p-5 rounded border-white border-2 w-3/4 max-w-xl" >
        
        {songsList.map(song => {
        return (
        <ul > 
          <li  key = {song.name}>
        <div className = "flex flex-row justify-between"> 
          <h4> {song.name} - {song.artist} </h4> 
          <div className = "flex justify-between min-w-8">
            <button> 
            <FontAwesomeIcon className = "fill-current text-gray-100 hover:text-gray-300"  icon="edit" />
            </button>
            <button className = "fill-current text-red-400 hover:text-red-800">             
               <FontAwesomeIcon icon="trash" />
            </button>
          </div>
        </div>
        </li>
        </ul>

        )})}
               <button className="w-36 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">New Song</button>

         </div>



   
   {/* <EditSong > </EditSong> */}

   {/* <ViewSong {...songsList[0]}> </ViewSong> */}

      </div>

    </div>
  );
}

const EditSong = (props) => { 
  return (
    <>
  <div className = "m-5 p-5 rounded border-white border-2">
          <p className = "my-2 text-white text-sm"> Title</p>
          <input className = "text-black min-w-xl" type="text"/>
          <p className = "my-2 text-white text-sm"> Artist</p>
          <input className = "text-black min-w-xl" type="text"/>
          <br/>
          <button className = "my-2 bg-blue-500 hover:bg-blue-700 w-36 rounded"> Update </button>

      </div> 
    </>
  )
  
  }

const ViewSong = ({name, artist, rating}) => { 
return (
  <>
  <div className = "m-5 p-5 rounded border-white border-2">
          <p className = "my-2 text-white text-bold text-xl"> {name}</p>
          <p className = "my-2 text-white text-sm"> {artist}</p>
          <p className = "my-2 text-white text-sm"> {rating}</p>
          <p className = "my-2 text-white text-md"> Rate it</p>
          <input className = "text-black" type="number"/>
  </div>

  </>
)


}

export default App;
