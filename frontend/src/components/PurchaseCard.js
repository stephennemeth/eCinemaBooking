import React from 'react';
import '../css/PurchaseCard.css';
import Card from './Card';

function PurchaseCard(props) { 
    return (
      <Card className='purchase'>
        <img src={props.image} alt={props.name} className='purchase-image' />
        <h2 className='purchase-name'>{props.name}</h2>
        <p className='purchase-date'>{props.date} ({props.time}) </p>
        <p className='purchase-price'>{props.price}</p>
        <p className='purchase-ticket'>Tickets purchased: {props.numtick}</p>
        <hr></hr>
        <p className='purchase-conf'>Confirmation #{props.confirmation}</p>
      </Card>
    );
  }
export default PurchaseCard;