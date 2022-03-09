export const ACTIONS= {
    GET_SONGS:"GET_SONGS",
    GET_ARTIST:"GET_ARTIST",
    GET_ALBUMS:"GET_ALBUMS",
    SET_CATEGORY:"SET_CATEGORY",
    SEARCH_QUERY : "SEARCH_QUERY",
    SINGLE_SONG : "SINGLE_SONG",
    IS_LOADING : "IS_LOADING",
    IS_ERROR : "IS_ERROR",
    SET_HOME_PAGE_SONGS : "SET_HOME_PAGE_SONGS",
    ADD_SONG_TO_LIKES:'ADD_SONG_TO_LIKES',
    REMOVE_FROM_LIKES:"REMOVE_FROM_LIKES",
    ADD_TO_PLAYLIST : "ADD_TO_PLAYLIST"
}

export const addToPlaylistAction = (playlist) => ({
type:ACTIONS.ADD_TO_PLAYLIST,
payload : playlist
})

export const addSongToLikesAction = (song) =>({
  type:ACTIONS.ADD_SONG_TO_LIKES,
  payload:song

})

export const removeFromSongListAction =(song)=> {
  return (dispatch)=> {
    dispatch({
      type:ACTIONS.REMOVE_FROM_LIKES,
      payload:song
    })
  }
}
export const searchQueryAction =(searchQuery)=>({
  type:ACTIONS.SEARCH_QUERY,
  payload:searchQuery
})

export const singleSongAction =(singleSong)=>({
  type:ACTIONS.SINGLE_SONG,
  payload:singleSong
})

export const getSongsAction =(query, category)=> {
    return async(dispatch)=> {
            if(!category){
              dispatch({
                type : ACTIONS.IS_LOADING,
                payload:true
              })
            }
        try {
            let response = await fetch(
              'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
              query,
              {
                method: 'GET',
                headers: new Headers({
                  'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                  'X-RapidAPI-Key':
                    '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
                }),
              }
            )
            if(response.ok){
              let result = await response.json()
              let songInfo = result.data
              console.log("Result", songInfo);
              // this.setState({
              //   [category]: [...this.state[category], songInfo[0]],
              // })
              if(!category){
                dispatch({
                  type:ACTIONS.GET_SONGS,
                  payload:songInfo
                })
                dispatch({
                  type: ACTIONS.SET_CATEGORY,
                  payload: category
                })
                dispatch({
                  type : ACTIONS.IS_LOADING,
                  payload:false
                })
              } else{
                dispatch({
                  type: ACTIONS.SET_HOME_PAGE_SONGS,
                  payload : { category : category, homeSongs:songInfo}
                })
                dispatch({
                  type: ACTIONS.SET_CATEGORY,
                  payload: category
                })
                dispatch({
                  type : ACTIONS.IS_LOADING,
                  payload:false
                })
              }

            } else {
              dispatch({
                type : ACTIONS.IS_ERROR,
                payload:true
              })
              dispatch({
                type : ACTIONS.IS_LOADING,
                payload:false
              })
            }
          } catch (err) {
            console.log(err)
            dispatch({
              type : ACTIONS.IS_ERROR,
              payload:true
            })
          }
    }
}
