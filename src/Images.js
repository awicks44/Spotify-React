import React, { useState } from 'react';
import styled from 'styled-components'
import fire from './images/fire.jpeg'
import leaf from './images/leaf.jpeg'
import gran from './images/gran.jpeg'
import peel from './images/peel.jpeg'


const Body = () => {
  const [divId, setDivId] = useState([])

  const showState = (argument) => {
    while (argument > 0 ) {
      divId.push(`div${argument--}`)
    }
    return divId.reverse()
  }
  showState(13)
  return (
    <DivStyles>
      {divId.map( id => {
        return <div class={id}> {id} </div>
      })}
    </DivStyles>
  );
};

const DivStyles = styled.div`
  display: grid;
grid-template-columns: repeat(7, minmax(100px,  1fr) );
grid-template-rows: repeat(7, minmax(100px, 1fr));
grid-column-gap: 5px;
grid-row-gap: 5px;
grid-auto-flow: dense;`

export default Body;