import React from 'react';

const Listbox = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }    

    console.log(props);
    return (
        <div className="col-sm-6 px-0">
            <div className="list-group">
                {
                    props.items.map((item, idx) => 
                    <button key={idx}
                        onClick={clicked}
                        className="list-group-item list-group-item-action list-group-item-light"
                        id={item.id}>
                            
                            {item.name}
                    </button>)
                }
            </div>
        </div>
        

    );
}

export default Listbox;