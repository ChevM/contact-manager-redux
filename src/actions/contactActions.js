import {
  ADD_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  GET_ALL_CONTACTS,
  CLEAR_CONTACT,
  GET_ERRORS
} from "./types";
import axios from "axios";

export const addContact = newContact => async dispatch => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: ADD_CONTACT, payload: await res.data });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getContact = id => async dispatch => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({ type: GET_CONTACT, payload: res.data });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const updateContact = updatedContact => async dispatch => {
  const { id } = updatedContact;
  try {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedContact
    );
    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteContact = id => async dispatch => {
  // Dispatches in finally block instead of try, because the dummy API does not contain IDs > 12
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ERRORS, payload: err });
  } finally {
    dispatch({ type: DELETE_CONTACT, payload: id });
  }
};

export const getAllContacts = () => async dispatch => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({
      type: GET_ALL_CONTACTS,
      payload: res.data
    });
  } catch (err) {
    // Dummy error catching
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const clearContact = () => {
  return {
    type: CLEAR_CONTACT
  };
};
