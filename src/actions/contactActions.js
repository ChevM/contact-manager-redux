import {
  ADD_CONTACT,
  GET_CONTACT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  GET_ALL_CONTACTS,
  GET_ERRORS
} from "./types";
import _ from "lodash";
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

export const getContact = async id => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const updateContact = (updatedContact, history) => async dispatch => {
  const { id, name, email, phone } = updatedContact;

  let errors = {};

  // Validate input
  if (_.isEmpty(name)) {
    errors.name = "Name field is required";
  }
  if (_.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (_.isEmpty(phone)) {
    errors.phone = "Phone field is required";
  }

  if (_.isEmpty(errors)) {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedContact
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });

      // Clear state
      this.setState({
        name: "",
        email: "",
        phone: "",
        errors: {}
      });

      // Redirect user to homepage
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
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
