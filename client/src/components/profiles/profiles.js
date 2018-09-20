import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";
import ProfileItem from "./profileItem";
import Loader from "../common/loader";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }
  componentDidMount() {
    this.props.getProfiles();
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 30) });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { search } = this.state;

    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Loader />;
    } else {
      profileItems = profiles.filter(
        profile => profile.user.name.toLowerCase().indexOf(search) === -1
      );

      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Profiles</h1>
              <input
                type="text"
                className="form-control mb-4"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                placeholder="Search"
              />
              {profileItems}

              <Pagination
                className="users-pagination pull-right"
                bsSize="medium"
                maxButtons={10}
                first
                last
                next
                prev
                boundaryLinks
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
