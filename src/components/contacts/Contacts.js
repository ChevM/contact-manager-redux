import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllContacts } from "../../actions/contactActions";
import Contact from "./Contact";

export class Contacts extends Component {
  static propTypes = {
    getAllContacts: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        phone: PropTypes.string
      }).isRequired
    )
  };
  // ! Dummy API does not give unique IDs
  async componentDidMount() {
    // ? try catch?
    await this.props.getAllContacts();
  }
  render() {
    const [...contacts] = this.props.contacts;
    return (
      <div className="col-sm-11 col-md-10 col-lg-9 mx-auto">
        <h1 className="display-4 mb-3">
          <span className="text-primary">Contact</span> List
        </h1>
        <div id="accordion">
          {contacts
            .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
            .map(contact => (
              <Contact key={contact.id} contact={contact} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts
});

export default connect(
  mapStateToProps,
  { getAllContacts }
)(Contacts);
