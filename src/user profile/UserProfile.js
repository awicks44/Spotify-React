import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddressForm from '../address form/AddressForm';
import Button from '../button/Button';
import ErrorPage from '../error page/ErrorPage';
import SuccessMessage from '../success message/SuccessMessage';
import styles from './UserProfile.module.css';

/**
 * Component that slides out to display the current user's account details
 * @param {Object} user - the user object to display details from
 * @param {function} toggleCallback - the function to call when the panel slides offscreen
 */
const UserProfile = ({ user, setUser, toggleCallback }) => {
  const [panelStyle, setPanelStyle] = useState(styles['panel-slide-out']);
  const [editAddress, setEditAddress] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState();

  /**
   * changes the profile animation to slide back in, and waits
   * a second for the animation to play before removing itself
   */
  const closeProfile = () => {
    setPanelStyle(styles['panel-slide-in']);
    setTimeout(() => toggleCallback(false), 1000);
  };

  const updateAddress = async (street, city, state, zip) => {
    const updatedUser = user;
    updatedUser.street = street;
    updatedUser.city = city;
    updatedUser.state = state;
    updatedUser.zip = zip;
    setFeedbackMessage();
    let errorCode;
    await fetch(`http://localhost:8080/customers/${user.id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(updatedUser)
    }).then(async (response) => {
      if (response.ok) {
        setFeedbackMessage(<SuccessMessage message="Your address has been updated." />);
        setUser(await response.json());
        setEditAddress(false);
      } else {
        errorCode = response.status;
      }
    }).catch(() => {
      setFeedbackMessage(<ErrorPage errorCode={errorCode || 503} />);
    });
  };

  if (!user) {
    return (
      <div className={`${styles['user-profile']} ${panelStyle}`}>
        <button type="button" onClick={closeProfile} className={`btn ${styles['close-profile-button']}`}>
          <i className="fas fa-angle-double-right" />
        </button>
        <h1 className="mt-4 text-center">Could not load user data</h1>
      </div>
    );
  }

  return (
    <div className={`${styles['user-profile']} ${panelStyle}`}>
      <button type="button" onClick={closeProfile} className={`btn ${styles['close-profile-button']}`}>
        <i className="fas fa-angle-double-right" />
      </button>
      <h1 className={`text-center m-4 ${styles['user-full-name']}`}>{`${user.firstName} ${user.lastName}`}</h1>
      <div className={styles['feedback-container']}>
        {feedbackMessage}
      </div>
      <Button onClick={() => { setEditAddress(true); }} text="Edit Information" />
      <AddressForm user={user} handleSubmit={updateAddress} edit={editAddress} />
      <div className="text-center mt-2">
        <Link to="/wishlist">
          <button type="button" className={`btn btn-primary ${styles}`} onClick={closeProfile}>View Wish List</button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
