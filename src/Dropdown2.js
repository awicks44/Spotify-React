import React, { useState } from 'react';
import { styles } from './Dropdown2.css'

const Dropdown2 = props => {    
    const [name, setName] = useState(''); 
    
    const assignId = e => {
        props.changed(e.target.id);
        // props.changed(e.target.name);
        setName({
            name: e.target.getAttribute("name")
        });
        const v = e.target.getAttribute("name");
        console.log(v);
    }

    return (
        <div class='container'>   
            
            <h3 className='border' style={{
                // position: 'relative',
                top: '175px'
                }}>{name.name}</h3>
            {/* {console.log(v)} */}
            <div style={{
        right: '1.36%',
        bottom: '-100px',
        position: 'relative'
      }}>
            <button class='bg-dark' value={props.selectedValue} onClick={assignId}>
                {console.log(props.options[0])}
                {props.options.map((item, idx) => <img 
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