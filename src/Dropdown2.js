import React, { useState } from 'react';
import { styles } from './Dropdown2.css';
import itunes from './itunes.jpg';
import spotify from './spotify.png';
import bandcamp from './bandcamp.png';
import SpotifyPlayer from 'react-spotify-player';

const Dropdown2 = props => {    
    const size = {
        width: '100%',
        height: 300,
      };
      const view = 'list'; // or 'coverart'
      const theme = 'black'; // or 'white'
    const [name, setName] = useState(''); 
    
    const assignId = e => {
        setName({
            name: e.target.getAttribute("name")
        });
        props.changed(e.target.id);
        // props.changed(e.target.name);
        
        const v = e.target.getAttribute("name");
        console.log(v);
    }

    let albumTitle;
    if (name === '') {
        albumTitle = props.firstName;
    }
    else {
        albumTitle = name.name;
    }
    // if width <= 500 {

    // }

    return (
        <div>
            
            <div className='albumHeader w-50'>
                <h3 >{albumTitle}</h3>
            </div>
            <div className='row' align='right'>
            <br/>
            {/* <br/> */}
            
            <img className='column buy img-responsive' src={itunes} alt='...' />
            <img className='column buy img-responsive' src={bandcamp} alt='...' />
            <img className='column buy img-responsive' src={spotify} alt='...' />
            </div>
            
            <div align='left'>
            <br />
            <br />
            <br />
            <button className='row invisible' value={props.selectedValue} onClick={assignId}>
                {props.options.map((item, idx) => <img
                className='visible albums' 
                src={item.images[0].url} 
                key={idx + 1} 
                value={item.id} 
                id={item.id} 
                name={item.name}
                artist={item.artists[0].name}
                alt='...'
                />)}
            </button> 
            </div>
        </div>
    );
}

export default Dropdown2;