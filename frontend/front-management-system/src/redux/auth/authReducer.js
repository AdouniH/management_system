import {CONNECT, DISCONNECT, LOAD} from './authTypes'

const initialState = {
    token: null,
    connected: false,
    userdata: {
        username: null,
        email: null
    },
    loading: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case CONNECT: return {
        ...state,
        token: action.token,
        connected: true,
        userdata: action.userdata,
        loading: false
      }
      case DISCONNECT: return {
        ...state,
        token: null,
        connected: false,
        userdata: {
            username: null,
            email: null
        },
        loading: false
      }
      case LOAD: return {
        ...state,
        loading: true,
      }

      default: return state
   }
}

export default authReducer
