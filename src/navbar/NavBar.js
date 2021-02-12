import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import UserProfile from '../user profile/UserProfile';
import { useAppContext } from '../utils/Context';
import { QUASAR_API } from '../Constants';
import './NavBar.css';
import Button from '../button/Button';
import cart from './cart.png';

// wrapper for the navigation bar, the comments contained in the first section are
// relevent throughout the component
const NavBar = () => {
  const {
    isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userObject, setUserObject, crt, setCrt
  } = useAppContext();
  const sessionKey = 'user';
  const history = useHistory();
  // const [user, setUser] = useState(sessionStorage.getItem('user'));
  const [demographics, setDemographics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Fetches the user's data if logged in and it is needed
   */
  const fetchUserData = async () => {
    if (userObject || !isLoggedIn) {
      return;
    }
    await fetch(`${QUASAR_API}/customers?email=${userEmail}`, {
      method: 'GET',
      headers: new Headers({
        token: sessionStorage.getItem('token')
      })
    }).then(async (response) => {
      if (response.ok) {
        const userData = await response.json();
        setUserObject(userData);
        setCrt(userData.shoppingCart.length);
        sessionStorage.setItem('id', userData.id);
        sessionStorage.setItem('user', userData.email);
      }
    });
  };

  const fetchUserDataCallback = useCallback(fetchUserData,
    [setUserObject, userEmail, userObject, isLoggedIn, setCrt]);
  useEffect(fetchUserDataCallback, [fetchUserDataCallback]);

  useEffect(() => {
    const getDistinctValues = async () => {
      try {
        const demographicsReq = await fetch(`${QUASAR_API}/products/distinctValue/demographics`, {
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
        const demographicsData = await demographicsReq.json();
        setDemographics(demographicsData);

        const categoriesReq = await fetch(`${QUASAR_API}/products/distinctValue/categories`, {
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
        const categoriesData = await categoriesReq.json();
        setCategories(categoriesData);

        const typesReq = await fetch(`${QUASAR_API}/products/distinctValue/types`, {
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
        const typesData = await typesReq.json();
        setTypes(typesData);
      } catch (err) {
        setError(true);
      }
    };
    getDistinctValues();
  }, []);

  /**
   * @name logOut
   * @description logs a user out of the website and returns them to the homepage
   */
  const logOut = () => {
    sessionStorage.removeItem(sessionKey);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    setIsLoggedIn(sessionStorage.getItem(sessionKey));
    setUserEmail(sessionStorage.getItem(sessionKey));
    setUserObject();
    history.push('/');
    setCrt('');
  };

  let count;
  if (crt === 0 || isLoggedIn === false) {
    count = (<p> </p>);
  } else {
    count = crt;
  }

  return (
    <div>
      {showUserProfile && (
        // <UserProfile
        //   user={userObject}
        //   setUser={setUserObject}
        //   toggleCallback={setShowUserProfile}
        // />
        <div />
      )}
      <div className="nottransparent">
        <div className="navbartop">
          <div className="logocontainer">
            <div className="logo">
              <a href="/"><img src={cart} alt="logo" /></a>
            </div>
          </div>
          <div className="cartbadge">
            <text className="unselectable">{count}</text>
          </div>
          <div className="login">
            {isLoggedIn
              ? (
                <div>
                  <button type="button" className="useremail mb-2" onClick={() => setShowUserProfile(true)}>
                    <span>
                      <i className="fas fa-cog emailspan" />
                      {' '}
                      {userEmail}
                    </span>
                  </button>
                  <Button id="logout" text="Logout" className="button" onClick={logOut} />
                </div>
              )
              : (
                <div>
                  <div className="useremail" />
                  <Button id="login" text="Login" className="button" onClick={() => history.push('/login')} />
                </div>
              )}
          </div>
        </div>
        <nav className="navbar navbar-expand-lg menu">
          {/* {error ? <div className="navError">Nav links could not be rendered</div> : ( */}
            <ul className="nav navbarnav" data-testid="dropdown">
              {/* {Array.isArray(demographics) && demographics.map((demographic) => (
                <li className="nav-item" data-testid={`${demographic.toLowerCase()}`}>
                  <a href={`/products/${demographic.toLowerCase()}`} className="navlink">{demographic}</a>
                  <ul data-testid="categories">
                    {categories.map((category) => (
                      <li>
                        <a href={`/products/${demographic.toLowerCase()}/${category.toLowerCase()}`}>{category}</a>
                        <ul>
                          {types.map((type) => <li><a href={`/products/${demographic.toLowerCase()}/${category.toLowerCase()}/${type.toLowerCase()}`}>{type}</a></li>)}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))} */}
              <li>
                <a href='/'>HI</a>
                <ul>
                  <li>hi</li>
                </ul>
              </li>  
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
