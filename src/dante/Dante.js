
import styles from './Dante.module.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Footer from './components/footer/Footer';
import { AppContext } from '../utils/Context';
// import HomePage from './components/home/Homepage';
import Login from '../onepirate/SignIn';
import Dropdown from '../Dropdown';
import Listbox from '../Listbox';
import Detail from '../Detail';
import { Credentials } from '../Credentials';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-player';
import Dropdown2 from '../Dropdown2';
import NavBar from '../navbar/NavBar';

import itunes from '../itunes.jpg';
import ReactPlayer from 'react-player';
import SignUp from '../onepirate/SignUp';
import Home from '../onepirate/Home';
import ProductHero from '../onepirate/modules/views/ProductHero';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import SoundCloud from 'react-custom-soundcloud';
import 'react-custom-soundcloud/dist/style.css';
 
const Dante = () => {
  const spotify = Credentials();  
  const Dante = {url: 'dante_patel', value: '2aoFQUeHD1U7pL098lRsDU', name: 'Dante Patel'};
  console.log('RENDERING APP.JS');

  // const data = [
  //   {value: 1, name: 'A'},
  //   {value: 2, name: 'B'},
  //   {value: 3, name: 'C'},
  // ]; 

  const [token, setToken] = useState('');  
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState({selectedAlbum: '', firstAlbum: '', firstName: '', listOfAlbumFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: ['asda', 'asda']});
  const [trackDetail, setTrackDetail] = useState(null);
  const [name, setName] = useState(''); 
  const myArtists = '2aoFQUeHD1U7pL098lRsDU,2pAWfrd7WFF3XhVt9GooDL,77AKJs9SJqxHXbPgtJPKRa';
  // const [album, setAlbum] = useState({images: []});
 
// size may also be a plain string using the presets 'large' or 'compact'
const size = {
  width: '100%',
  height: 300,
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'
  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
        axios(`https://api.spotify.com/v1/artists/${Dante.value}/albums`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(albumResponse => {
        console.log(albumResponse);
        setAlbum({
          selectedAlbum: album.selectedAlbum,
          // listOfAlbumFromAPI: albumResponse.data.albums.items
          firstAlbum: albumResponse.data.items[0].uri,
          firstName: albumResponse.data.items[0].name,
          listOfAlbumFromAPI: albumResponse.data.items
        })
      });
    console.log(album.selectedAlbum);
    });

  }, [Dante.value, album.selectedAlbum, artist.selectedArtist, album.firstAlbum, album.firstName, spotify.ClientId, spotify.ClientSecret]); 

  let mediaAlbum;
  if (album.selectedAlbum !== '') {
    mediaAlbum = `spotify:album:${album.selectedAlbum}`;
    
  }
  else {
    mediaAlbum = album.firstAlbum;
  }

  // const artistChanged = val => {
  //   setArtists({
  //     selectedArtist: val, 
  //     listOfArtistsFromAPI: artists.listOfArtistsFromAPI
  //   });

  //   // axios(`https://api.spotify.com/v1/browse/categories/${val}/albums?limit=10`, {
  //     axios(`https://api.spotify.com/v1/artists/${val}/albums`, {
  //     method: 'GET',
  //     headers: { 'Authorization' : 'Bearer ' + token}
  //   })
  //   .then(albumResponse => {
  //     console.log(albumResponse);
  //     setAlbum({
  //       selectedAlbum: album.selectedAlbum,
  //       // listOfAlbumFromAPI: albumResponse.data.albums.items
  //       firstAlbum: albumResponse.data.items.name,
  //       listOfAlbumFromAPI: albumResponse.data.items
  //     })
  //   });

  //   console.log(val);
  // }

  const albumChanged = val => {
    console.log(val);
    setAlbum({
      selectedAlbum: val,
      firstAlbum: album.firstAlbum,
      firstName: album.firstName,
      listOfAlbumFromAPI: album.listOfAlbumFromAPI
    });
    console.log(album.listOfAlbumFromAPI[0].uri);
  }

  const buttonClicked = e => {
    e.preventDefault();
    console.log(e);
    // axios(`https://api.spotify.com/v1/albums/${album.selectedAlbum}/tracks`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization' : 'Bearer ' + token
    //   }
    // })
    // .then(tracksResponse => {
    //   console.log(tracksResponse);
    //   setTracks({
    //     selectedTrack: tracks.selectedTrack,
    //     listOfTracksFromAPI: tracksResponse.data.items
    //   })
    // });

    // const images = album.listOfAlbumFromAPI.map((image, idx) => {
    //           return <img alt='...' key={idx+1} value={album.id} src={image.images[0].url} className="img-responsive" />
    // });
    // console.log(images);
    // setAlbum({
    //   album: album.e
    // });
  }

  // const albumChanged = val => {
  //   console.log(val);
  //   setAlbum({
  //     images: val,
  //   });
  // }

  // const listboxClicked = val => {

  //   const currentTracks = [...tracks.listOfTracksFromAPI];

  //   const trackInfo = currentTracks.filter(t => t.id === val);
  //   console.log(trackInfo);
  //   setTrackDetail(trackInfo[0]);



  // }

//   const dropdownChanged = e => {
//     props.changed(e.target.value);

// }
  
  return (
      <div className='outerScroll'>
      <div className='innerScroll'>
    <div className='container-fluid'>
      <div className='navBar'>
      {/* <NavBar /> */}
      <AppAppBar />
      <br/>
      
      <br/>
      <br/>
      <br/>
      <ProductHero />
      
      
      </div>
      
      
      
          {/* <Dropdown label="Artist :" options={artists.listOfArtistsFromAPI} selectedValue={artists.selectedArtist} changed={artistChanged} /> */}
          
          <Dropdown2 options={album.listOfAlbumFromAPI} selectedValue={album.selectedAlbum} firstName={album.firstName} changed={albumChanged} />
          <div className={styles.player}>
          <SpotifyPlayer 
              uri={mediaAlbum}
              size={size}
              view={view}
              theme={theme}
            />
          </div>
    </div>
    <br/>
    <br/>
      
    <div className='albumHeader'>
                <h3 >Latest From SoundCloud!</h3>
            </div>

    {/* <SignUp /> */}
    {/* <Home /> */}
    <div className={styles.player}>
    <SoundCloud
    playlist="774341907"
    mini={false}
    theme={'dark'}
  /></div>
  <br />
  <br />
  <br />
  </div>
  </div>
    
     );
};

export default Dante;
