import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteContact } from "../../actions/contactActions";

// ! Removed dropdown-toggle class but Nested dropdowns will not work without dropdown-toggle
export class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false
    };
    this.toggleContactInfoVisibility = this.toggleContactInfoVisibility.bind(
      this
    );
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onContactInfoClick = this.onContactInfoClick.bind(this);
  }
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string
    }).isRequired
  };

  toggleContactInfoVisibility() {
    this.setState(prevState => {
      return {
        showContactInfo: !prevState.showContactInfo
      };
    });
  }

  async onDeleteClick(e) {
    // e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const { id } = this.props.contact;

    await this.props.deleteContact(id);
  }
  onContactInfoClick(e) {
    e.stopPropagation();
  }

  render() {
    const { id, name, email, phone } = this.props.contact;

    return (
      <div className="card mb-3">
        <div
          className="card-header btn btn-light collapsed"
          onClick={this.toggleContactInfoVisibility}
          id={`heading${id}`}
          style={{ cursor: "pointer" }}
          role="button"
          data-toggle="collapse"
          data-target={`#collapse${id}`}
          aria-expanded="false"
          aria-controls={`collapse${id}`}
        >
          <div className="row align-items-center justify-content-between">
            <h5 className="col-auto">
              <span>
                {name}
                <i className={`fas fa-xs fa-fw fa-chevron-custom mx-auto`} />
              </span>
            </h5>
            {/* <i
                    onClick={e => this.onDeleteClick(id, dispatch, e)}
                    className="fas fa-times text-right col-auto"
                    style={{ cursor: "pointer", color: "red" }}
                  /> */}
            <div className="btn-group dropleft">
              <i
                className="fas fa-ellipsis-v text-right col-auto"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ cursor: "pointer", color: "gray" }}
              />
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  to={`/contact/edit/${id}`}
                  className="dropdown-item"
                  role="button"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={this.onDeleteClick}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <ul
          id={`collapse${id}`}
          className="list-group collapse"
          data-parent="#accordion"
        >
          <li className="list-group-item card-body">
            <i className="fas fa-fw fa-envelope" />
            <a href={`mailto:${email}`}>{email}</a>
          </li>
          <li className="list-group-item card-body">
            <i className="fas fa-fw fa-phone" />
            <a href={`tel:+${phone}`}>{phone}</a>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteContact }
)(Contact);
