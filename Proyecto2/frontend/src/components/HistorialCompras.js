import React, { useEffect, useState } from 'react';

export function HistorialCompras() {
  const [pedidos, setPedidos] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchOrders = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/orders?user=${userId}`);
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders('667b955f4164208f3da07ad6');  
  }, []);

  const handleStatusChange = async (pedidoId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${pedidoId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setPedidos(prevPedidos =>
          prevPedidos.map(pedido =>
            pedido._id === pedidoId ? { ...pedido, status: newStatus } : pedido
          )
        );
      } else {
        console.error('Error updating order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h1>Historial de Pedidos</h1>
      <div className="card" style={{ width: "80%" }}>
        {pedidos.map((pedido) => (
          <div key={pedido._id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h3>No. de Orden: {pedido._id}</h3>
            <h6>Fecha de realización: {new Date(pedido.orderDate).toLocaleDateString()}</h6>
            <h4>Items del Pedido:</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID del Libro</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Cantidad</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {pedido.items.map((libro) => (
                  <tr key={`${pedido._id}-${libro.bookId}`}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{libro.bookId}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{libro.quantity}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{libro.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h5>Estado: 
              <select
                value={selectedStatus[pedido._id] || pedido.status}
                onChange={(e) => handleStatusChange(pedido._id, e.target.value)}
              >
                <option value="en proceso">En proceso</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </h5>
            <h4>Total a Pagar: {pedido.totalAmount}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistorialCompras;
