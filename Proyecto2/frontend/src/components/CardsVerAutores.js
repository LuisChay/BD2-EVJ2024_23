import React from "react";
import {useEffect, useState} from 'react';
//import Tarjeta from "./Tarjeta.js";
import Tarjeta from "./Tarjeta";


function Cards() {
  const [autors, setAutors] = useState([]);
  
  useEffect(() => {
    const intervalo = setInterval(async () => {

        try{
          //const response = await fetch('http://127.0.0.1:4000/estado/nuevo')
          const response = await fetch('http://localhost:5000/authors')
          const data = await response.json()
          console.log(data)
          setAutors(data)
          
        }catch(error){
            console.error("error en busqueda de autors !!!", error)
            alert("error en busqueda de autors!!!", error)
        }

    }, 5000);

    return () => clearInterval(intervalo);
  }, []);


  return (
    <>
    <div id="catAutores" >
      <h1 >CATALOGO AUTORES</h1>
      <div className="container d-flex justify-content-center align-items-center h-100">
        
        <div className="row">
          {autors.map((data) => (
            <div className="col-md-4 mb-4" key={data._id}>
              <Tarjeta imageSource={data.photoUrl} title={data.name} url={`/AuthorProfile/${data._id}`} text={data.biography} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
/*

*/
export default Cards;