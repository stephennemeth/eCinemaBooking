import PurchaseCard from './PurchaseCard'
import '../css/PurchaseHistoryPage.css';
function Purchases(props) {
  const purchaseCard = props.user_list.map(purchase => (
    <PurchaseCard key={purchase.id} confirmation={purchase.confirmation} name={purchase.name} numtick={purchase.numtick} image={purchase.image} date={purchase.date} time={purchase.time} price={purchase.price} />
  ));

  return (
    <div className='purchases-container row d-flex justify-content-center align-items-center '>
      {purchaseCard}
    </div>
  ); 
}

export default Purchases;