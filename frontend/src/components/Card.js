import '../css/Card.css'

function Card(props) {
  return (
    <div className={`cards ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;