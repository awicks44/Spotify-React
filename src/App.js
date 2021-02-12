import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import Detail from './Detail';
import { Credentials } from './Credentials';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-player';
import Dropdown2 from './Dropdown2';
import NavBar from './navbar/NavBar';
import styles from './App.css';
import itunes from './itunes.jpg';

const App = () => {

  const spotify = Credentials();  

  console.log('');

  // const data = [
  //   {value: 1, name: 'A'},
  //   {value: 2, name: 'B'},
  //   {value: 3, name: 'C'},
  // ]; 

  const [token, setToken] = useState('');  
  const [artists, setArtists] = useState({selectedArtist: '', listOfArtistsFromAPI: []});
  const [album, setAlbum] = useState({selectedAlbum: '', selectedAlbumImage: '', listOfAlbumFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: ['asda', 'asda']});
  const [trackDetail, setTrackDetail] = useState(null);
  const [name, setName] = useState(''); 
  const myArtists = '2aoFQUeHD1U7pL098lRsDU,2pAWfrd7WFF3XhVt9GooDL,77AKJs9SJqxHXbPgtJPKRa'
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
        axios(`https://api.spotify.com/v1/artists?ids=${myArtists}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (artistResponse => {        
        console.log(artistResponse);
        setArtists({
          selectedArtist: artists.selectedArtist,
          // listOfArtistsFromAPI: artistResponse.data.categories.items
          listOfArtistsFromAPI: artistResponse.data.artists
        })
      });
      
    });

  }, [artists.selectedArtist, spotify.ClientId, spotify.ClientSecret]); 

  const artistChanged = val => {
    setArtists({
      selectedArtist: val, 
      listOfArtistsFromAPI: artists.listOfArtistsFromAPI
    });

    // axios(`https://api.spotify.com/v1/browse/categories/${val}/albums?limit=10`, {
      axios(`https://api.spotify.com/v1/artists/${val}/albums`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(albumResponse => {
      console.log(albumResponse);
      setAlbum({
        selectedAlbum: album.selectedAlbum,
        // listOfAlbumFromAPI: albumResponse.data.albums.items
        selectedAlbumImage: albumResponse.data.items.name,
        listOfAlbumFromAPI: albumResponse.data.items
      })
    });

    console.log(val);
  }

  const albumChanged = val => {
    console.log(val);
    setAlbum({
      selectedAlbum: val,
      selectedAlbumImage: album.selectedAlbumImage,
      listOfAlbumFromAPI: album.listOfAlbumFromAPI
    });
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
      <div>
      <NavBar />
      </div>
          <Dropdown label="Artist :" options={artists.listOfArtistsFromAPI} selectedValue={artists.selectedArtist} changed={artistChanged} />
          
          <Dropdown2 options={album.listOfAlbumFromAPI} selectedValue={album.selectedAlbum} changed={albumChanged} />
          <div className='spotifyPlayer'>
          <SpotifyPlayer
              uri={`spotify:album:${album.selectedAlbum}` || `spotify:album:${album[0]}`}
              size={size}
              view={view}
              theme={theme}
            />
          </div>
    </div>
    </div>
    </div>
    
    
  );
}

export default App;