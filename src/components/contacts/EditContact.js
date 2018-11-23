import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getContact,
  updateContact,
  clearContact
} from "../../actions/contactActions";
import _ from "lodash";
import TextInputGroup from "../layout/TextInputGroup";

export class EditContact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static propTypes = {
    getContact: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired,
    clearContact: PropTypes.func.isRequired,
    contact: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string
    }).isRequired
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      await this.props.getContact(id);
      const { name, email, phone } = this.props.contact;
      this.setState({ name, email, phone });
    } catch (err) {
      console.log(err);
    }
  }
  componentWillUnmount() {
    this.props.clearContact();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();

    const { id } = this.props.match.params;
    const { name, email, phone } = this.state;

    let errors = {};

    const updatedContact = {
      id,
      name,
      email,
      phone
    };

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
    this.setState({ errors });

    if (_.isEmpty(errors)) {
      try {
        await this.props.updateContact(updatedContact);

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
  }

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <section className="col-sm-11 col-md-10 col-lg-9 mx-auto">
        <div className="display-4 my-3">
          <span className="text-primary">Edit</span> Contact
        </div>
        <form onSubmit={this.onSubmit} className="mr-auto">
          <TextInputGroup
            label="Name"
            placeholder="Enter Name..."
            name="name"
            value={name}
            required={false}
            onChange={this.onChange}
            error={errors.name}
            id=""
          />
          <TextInputGroup
            type="email"
            label="Email"
            placeholder="Enter Email..."
            name="email"
            value={email}
            onChange={this.onChange}
            error={errors.email}
            id=""
          />
          <TextInputGroup
            label="Phone"
            placeholder="Enter Phone..."
            name="phone"
            value={phone}
            onChange={this.onChange}
            error={errors.phone}
          />
          <input
            type="submit"
            value="Update Contact"
            className="btn btn-success btn-block"
          />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contacts.contact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact, clearContact }
)(withRouter(EditContact));
