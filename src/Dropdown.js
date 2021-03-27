import React, { useState, useEffect } from 'react';

const Dropdown = props => {    

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }

    const [album, setAlbum] = useState({selectedAlbum: ''});
    console.log(props);
    const images = props.options.map(image => {
        return <img alt='...' key={image} src={image.images[1].url} className="img-responsive" />
     });

    return (
        <div className="col-sm-6 form-group row px-0">     
            <label className="form-label col-sm-2">{props.label}</label>       
            <select value={props.selectedValue} onChange={dropdownChanged} className="form-control form-control-sm col-sm-10">
                <option key={0}>Select...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>            
        {/* <button type="button" value={props.selectedValue} onClick={dropdownChanged}> */}
            
            {/* {props.options.map((item, idx) => <button type="button" onClick={setAlbum({ */}
        {/* selectedAlbum: item.uri */}
        {/* // listOfAlbumFromAPI: albumResponse.data.albums.items */}
      {/* })} key={idx+1} value={item.id}> */}
            {/* {'a'} */}
            {/* <option key={0}>Select...</option> */}
                {/* <img src={item.images[0].url} className="img-responsive" alt='...'/> */}
                
                {/* </button>)} */}
                       {/* { images } */}
                       {/* {console.log(props.options.id)} */}
        {/* </button> */}
        </div>
    );
}

export default Dropdown;