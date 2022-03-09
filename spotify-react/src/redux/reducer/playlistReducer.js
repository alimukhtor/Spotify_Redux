import { ACTIONS } from "../actions";
import { initialState } from "../store";

export  const playlistReducer = (state = initialState.playlist, action) => {
    switch(action.type){
        case ACTIONS.ADD_TO_PLAYLIST:
        return {
            ...state,
            playlist : state.playlist.find(list => list.name === action.payload.name)
        }
        default:
            return state
    }
}
export  default playlistReducer