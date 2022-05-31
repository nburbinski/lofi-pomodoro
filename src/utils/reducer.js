import { reducerCases } from "./Constants";

export const initialState = {
  access_token: null,
  currently_playing: null,
  isPlaying: false,
  customMinutes: 0,
  customSeconds: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case reducerCases.SET_CURRENTLY_PLAYING:
      return {
        ...state,
        currently_playing: action.payload,
      };
    case reducerCases.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case reducerCases.SET_CUSTOM_MINUTES:
      return {
        ...state,
        customMinutes: action.payload,
      };
    case reducerCases.SET_CUSTOM_SECONDS:
      return {
        ...state,
        customSeconds: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
