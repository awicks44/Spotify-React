
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
import bandcamp from '../bandcamp.png';
import spotifyi from '../spotify.png';
import ReactPlayer from 'react-player';
import SignUp from '../onepirate/SignUp';
import Home from '../onepirate/Home';
import ProductHeroLayout from '../onepirate/modules/views/ProductHeroLayout';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import SoundCloud from 'react-custom-soundcloud';
import 'react-custom-soundcloud/dist/style.css';
import withRoot from '../onepirate/modules/withRoot';
import Typography from '../onepirate/modules/components/Typography';
import bg from '../onepirate/modules/views/1977.png';
import ProductHero from '../onepirate/modules/views/ProductHero';
import clsx from 'clsx';
import { useAppContext } from '../utils/Context';

 
const Dante = () => {
  const spotify = Credentials();  
  const Dante = {url: 'dante_patel', value: '2pAWfrd7WFF3XhVt9GooDL', name: 'Dante Patel'};
  console.log('RENDERING APP.JS');
  const styles = (theme) => ({
    background: {
      backgroundImage: `url(${bg})`,
      backgroundColor: '#7fc7d9', // Average color of the background image.
      backgroundPosition: 'center',
    },
    background2: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: -2,
    },
    bg: {
      height: 1000
    },
    backdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.5,
      zIndex: -1,
    },
  });

  // const data = [
  //   {value: 1, name: 'A'},
  //   {value: 2, name: 'B'},
  //   {value: 3, name: 'C'},
  // ]; 

  const [token, setToken] = useState('');  
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState({selectedAlbum: '', selectedAlbumName: '', firstAlbum: '', firstName: '', listOfAlbumFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: ['asda', 'asda']});
  const [trackDetail, setTrackDetail] = useState(null);
  const { name, setName } = useAppContext();
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
          selectedAlbumName: album.selectedAlbumName,
          // listOfAlbumFromAPI: albumResponse.data.albums.items
          firstAlbum: albumResponse.data.items[0].uri,
          firstName: albumResponse.data.items[0].name,
          listOfAlbumFromAPI: albumResponse.data.items
        })
      });
    console.log(album.selectedAlbumName);
    });

  }, [Dante.value, album.selectedAlbum, album.selectedAlbumName, artist.selectedArtist, album.firstAlbum, album.firstName, spotify.ClientId, spotify.ClientSecret]); 

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

  const albumChanged = (val) => {
    console.log(val);
    console.log(album.selectedAlbumName);
    setAlbum({
      selectedAlbum: val,
      selectedAlbumName: album.selectedAlbumName,
      firstAlbum: album.firstAlbum,
      firstName: album.firstName,
      listOfAlbumFromAPI: album.listOfAlbumFromAPI
    });
    console.log(album.listOfAlbumFromAPI[0].uri);
  }

  const albumNameChanged = (name) => {
    console.log(name);
    setAlbum({
      selectedAlbum: album.selectedAlbum,
      selectedAlbumName: name,
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
      {/* <ProductHeroLayout visibility='visible' backgroundClassName={styles.background}>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {styles.backgroundImage}
      </Typography>
      </ProductHeroLayout> */}
      
      
      
</div>
<div className='flexbox'>
      <img class='bg d-inline' src={bg} alt='...'/>
      <span className='description d-inline'> Here is a really iiiiiiiiii iiiiiiiiiiiiii iiiiiiiii asdfoih;n aisunfo iasodij oaijd aosidj asdoij dasoij asodija sojda OSJdnfl ;;OF N;WORQ3 N;OERWN ;OWER Nsick description.</span>
      
      </div>
      <br/>
      
      
      {/* <div className='flexbox'> */}
<div className='flexbox'>
  {/* <flex-item> */}
  <div className='player d-inline' align='left'>
          <SpotifyPlayer
              uri={mediaAlbum}
              size={size}
              view={view}
              theme={theme}
      />
      <div className='player3' id='header'>
            <br/>
            <br/>
            <div className='albumHeader w-50'>
                <h3 >{name.name}</h3>
            </div>
            <br/>
            <div className='row'>
            
            <img className='column buy img-responsive' src={itunes} alt='...' />
            <img className='column buy img-responsive' src={bandcamp} alt='...' />
            <img className='column buy img-responsive' src={spotifyi} alt='...' />
            </div>
            </div>
      </div>
      <div target="#header">
  <Dropdown2 className='player2 d-inline' align='right' options={album.listOfAlbumFromAPI} selectedValue={album.selectedAlbum} selectedName={album.selectedAlbumName} firstName={album.firstName} changed={albumChanged} />
  </div>
      
      </div>
      {/* </flex-item> */}
      
      
          {/* </div> */}
          {/* <div className='player2 d-inline'  align='right'>
          <div >
                <h3 className='albumHeader w-50'>{album.selectedAlbum}</h3>
                
            </div>
            
            
            </div> */}
            </div>
            {/* </div> */}
      
          {/* <Dropdown label="Artist :" options={artists.listOfArtistsFromAPI} selectedValue={artists.selectedArtist} changed={artistChanged} /> */}
          {/* <div className='up' align='right'> */}
          
          {/* </div> */}
          
          {/* <div className='w-50'>
          <SpotifyPlayer 
              uri={mediaAlbum}
              size={size}
              view={view}
              theme={theme}
            />
          </div> */}
          
    
    <br/>
    <br/>
      
    {/* <div className='albumHeader'>
                <h3 >Latest From SoundCloud!</h3>
            </div> */}

    {/* <SignUp /> */}
    {/* <Home /> */}
    <div>
    <SoundCloud
    playlist="222968340"
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

export default withRoot(Dante);
