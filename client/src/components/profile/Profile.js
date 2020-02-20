import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByUserId } from '../../actions/profile';
//import Spinner or loading bar

const Profile = ({
  match,
  getProfileByUserId,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
  }, [getProfileByUserId]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <div>Spinner</div>
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          {console.log(profile)}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
