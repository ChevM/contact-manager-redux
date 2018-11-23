import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getContact } from "../../actions/contactActions";
import axios from "axios";
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
  }
  // static propTypes = {
  //   contact: PropTypes.shape({
  //     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  //     name: PropTypes.string.isRequired,
  //     email: PropTypes.string,
  //     phone: PropTypes.string
  //   }).isRequired
  // };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const { name, email, phone } = await this.props.getContact(id);

      this.setState({ name, email, phone });
    } catch (err) {
      console.log(err);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(dispatch, e) {
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
        const res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          updatedContact
        );

        dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getContact }
)(withRouter(EditContact));
