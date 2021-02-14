import React, { useState } from 'react';
import { styles } from './Dropdown2.css';
import itunes from './itunes.jpg';
import spotify from './spotify.png';
import bandcamp from './bandcamp.png';

const Dropdown2 = props => {    
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
        console.log(props.firstName);
        console.log(name);
        albumTitle = props.firstName;
    }
    else {
        console.log(props.firstName);
        console.log(name);
        albumTitle = name.name;
    }
    // if width <= 500 {

    // }

    return (
        <div className='container-fluid'>
            
            
            <br />
            <br />
            <div className='row'>
            <img className='column buy img-responsive' src={itunes} alt='...' />
            <img className='column buy img-responsive' src={bandcamp} alt='...' />
            <img className='column buy img-responsive' src={spotify} alt='...' />
            </div>
            
            <div>
                
            <button className='row invisible' value={props.selectedValue} onClick={assignId}>
                {console.log(props.options[0])}
                {props.options.map((item, idx) => <img
                className='img-responsive column visible' 
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
            <br />
            <div className='albumHeader'>
                <h3 >{albumTitle}</h3>
            </div>
        </div>
    );
}

export default Dropdown2;