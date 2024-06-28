import React, { useState, useEffect } from "react";

const CardAutores = ({ autores }) => {

    const deleteAutor = () => {
        console.log("delete autor");
    }

    return (
        <>
            {autores.map(autor => (
                <figure key={autor._id} className="snip1336"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample69.jpg" alt="sample69" />
                    <figcaption>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg" alt="profile-sample5" className="profile" />
                        <h2>{autor.name}<span>Accountant</span></h2>
                        <p>{autor.biography}</p>
                        <a className="follow" onClick={deleteAutor}>Eliminar</a>
                    </figcaption>
                </figure>
            ))}
        </>
    );

}


export default CardAutores;