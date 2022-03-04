import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import albumsReducer from '../reducer/albumsReducer'
import artistsReducer from '../reducer/artistsReducer'
import { favoriteSongReducer } from '../reducer/favoriteSongReducer'
import songsReducer from '../reducer/songsReducer'

// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const initialState = {
    likes:{
        songs:[],
        albums:[],
        artists:[]
    },
    song:{
        songs:[],
        category:'',
        searchQuery:''
    },
    album:{
        albums:[]
    },
    artist:{
        artists:[]
    }
    

}


// **************** CONNECTING REDUCERS ****************

const multiReducer = combineReducers({
    song: songsReducer,
    album: albumsReducer,
    artist:artistsReducer,
    likes:favoriteSongReducer
})

// *************** CONFIGURATION STOREE HERE *****************

let configStore = createStore(
    multiReducer,
    initialState,
    composeThatAlwaysWorks(applyMiddleware(thunk))
  )

  export default configStore