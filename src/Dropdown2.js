import React, { useState } from 'react';
import { styles } from './Dropdown2.css';
import itunes from './itunes.jpg';
import spotify from './spotify.png';
import bandcamp from './bandcamp.png';
import SpotifyPlayer from 'react-spotify-player';
import { useAppContext } from './utils/Context';

const Dropdown2 = props => {    
    const size = {
        width: '100%',
        height: 300,
      };
      const view = 'list'; // or 'coverart'
      const theme = 'black'; // or 'white'
      const {
        name, setName
      } = useAppContext();
    
    const assignId = (e) => {
        setName({
            name: e.target.name
        });
        // props.changed(e.target.name);
        // props.changed(e.target.name);
        props.changed(e.target.id);
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
        <div className='up'>
            <div>
            {/* <div className='player2 d-inline' align='right'>
            <div className='albumHeader w-50'>
                <h3 >{albumTitle}</h3>
            </div>
            <div className='row'>
            
            <img className='column buy img-responsive' src={itunes} alt='...' />
            <img className='column buy img-responsive' src={bandcamp} alt='...' />
            <img className='column buy img-responsive' src={spotify} alt='...' />
            </div>
            </div> */}
      </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div align='left'>
            
            
            <button className='row invisible buttonx' value={props.selectedValue} name={props.selectedName} onClick={assignId}>
                {props.options.map((item, idx) => <img
                target="#header"
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