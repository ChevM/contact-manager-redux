import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: state.contacts.concat(action.payload)
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

export const Consumer = Context.Consumer;

export class Provider extends Component {
  state = {
    contacts: [],
    /**
     * @param {object} action action with type and optional payload
     */
    dispatch: action => this.setState(state => reducer(state, action))
  };

  // ! Dummy API does not give unique IDs
  async componentDidMount() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.setState({ contacts: res.data });
    } catch (err) {
      // Dummy error catching
      console.log(err);
    }
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
