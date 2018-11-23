import {
  ADD_CONTACT,
  GET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  GET_ALL_CONTACTS
} from "../actions/types";

const initialState = {
  contacts: [],
  contact: {},
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: state.contacts.concat(action.payload)
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        contact: {}
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case GET_ALL_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
}
