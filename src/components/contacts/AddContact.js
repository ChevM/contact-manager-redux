import React, { Component } from "react";
import { connect } from "react-redux";
import { addContact } from "../../actions/contactActions";
import PropTypes from "prop-types";
import _ from "lodash";
import TextInputGroup from "../layout/TextInputGroup";

export class AddContact extends Component {
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
    addContact: PropTypes.func.isRequired
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();

    const { name, email, phone } = this.state;

    let errors = {};

    const newContact = {
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
        // action dispatch
        await this.props.addContact(newContact);
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
      <div className="col-sm-11 col-md-10 col-lg-9 mx-auto">
        <div className="display-4 my-3">
          <span className="text-primary">Add</span> Contact
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
            value="Add Contact"
            className="btn btn-success btn-block"
          />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addContact }
)(AddContact);
