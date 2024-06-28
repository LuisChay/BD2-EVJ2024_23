import React, {useEffect, useState} from 'react'
import ElementoC from './ElementoC';

export function Carrito (){
  const [carrito, setCarrito] = useState();
  const [reload, setReload] = useState(false);
  const [total, setTotal] = useState(0);
  //const idU = localStorage.getItem('userId');'667b955f4164208f3da07ad6'
  const idU = '667b955f4164208f3da07ad6';
 // console.log(idU);

  useEffect(() => {
  const fetchCarrito = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart?user=${userId}`);
      const data = await response.json();
      setCarrito(data);
      //console.log(data);
      const response2 = await fetch(`http://localhost:5000/cart/total?user=${userId}`);
      const data2 = await response2.json();
      setTotal(data2.total);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  fetchCarrito(idU);  
  },[]);

  const addCantidad = (bookid, cantidad) => {
    fetch("http://localhost:5000/api/cart/updquantity", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: idU,
        bookId: bookid,
        quantity: cantidad
      })
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching sub cantidad carrito:', error));
    setReload(!reload);
  }

  const subCantidad = (bookid, cantidad) => {
    fetch("http://localhost:5000/api/cart/updquantity", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: idU,
        bookId: bookid,
        quantity: cantidad
      })
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching sub cantidad carrito:', error));
    setReload(!reload);
  }

  const eliminarEC = book => {
    fetch("http://localhost:5000/api/cart/updquantity", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: idU,
        bookId: book
      })
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching sub cantidad carrito:', error));
    setReload(!reload);
  }

  const hacerPedido = () => {
    fetch("http://localhost:5000/orders/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: idU,
        totalA: total
      })
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching hacer pedido:', error));
    setReload(!reload);
  }

  if (!carrito) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1>Carrito</h1>
      {
        carrito.items.map((eleC) => (
          <ElementoC
            key={eleC._id}
            bookId={eleC.bookId}
            cantidad={eleC.quantity}
            sumCantidad={addCantidad}
            resCantidad={subCantidad}
            eliminar={eliminarEC}
          />
        ))
      }
      <h3>Total a pagar: {total}</h3>
      <button type="button" className="btn btn-primary" onClick={() => hacerPedido()}>Hacer Pedido</button>
    </>
  );
}

export default Carrito;