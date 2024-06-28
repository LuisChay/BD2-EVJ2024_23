import React, { useEffect, useState } from 'react'
import HCard from './HCard';

export function Historial(){
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/orders?user=${userId}`);
      const data = await response.json();
      setPedidos(data);
      //console.log(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  fetchOrders('667b955f4164208f3da07ad6');  
  },[]);

  const actualizarStatus = id => {
    fetch(`http://localhost:5000/orders/editstatus?orderId=${id}&newstatus=Entregado`)
      .then(response => response.json())
      .catch(error => console.error('Error fetching estado pedido:', error));
  }

  return (
    <div>
      <h1>Historial de Pedidos</h1>
      <div className="card" style={{width: "80%"}}>
      {
        pedidos.map((pedido) => (
          <div key={pedido._id}>
            <div className="card-header"> <h4><strong>No. de Orden: {pedido._id}</strong></h4></div>
            <p className="card-text"> Fecha de realización: {pedido.orderDate}</p>
            {
              pedido.items.map((libro) => (
                <HCard
                  key={libro._id}
                  bookId={libro.bookId}
                  quantity={libro.quantity} 
                  price={libro.price}
                />
              ))
            }
            <h6>Metodo de Pago: {pedido.paymentMethod}</h6>
            <h5>Estado: {pedido.status}</h5>
            <button type="button" className="btn btn-success" disabled={pedido.status !== 'Enviado'} onClick={() => actualizarStatus(pedido._id)}>Confirmar entrega</button>
            <div className="card-footer"><h4>Total a Pagar: {pedido.totalAmount}</h4></div>
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default Historial;