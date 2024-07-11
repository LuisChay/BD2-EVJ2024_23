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

  return (
    <div>
      <h1>Historial de Pedidos</h1>
      <div className="card" style={{width: "80%"}}>
      {
        pedidos.map((pedido) => (
          <div key={pedido._id}>
            <h3>No. de Orden: {pedido._id}</h3>
            <h6> Fecha de realización: {pedido.orderDate}</h6>
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

            <h5>Estado: {pedido.status}</h5>
            <button type="button" class="btn btn-success" disabled={pedido.status !== 'enviado'}>Confirmar entrega</button>
            <h4>Total a Pagar: {pedido.totalAmount}</h4>
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default Historial;