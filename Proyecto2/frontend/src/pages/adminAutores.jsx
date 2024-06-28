import React, { useState, useEffect } from "react";
import CardAutores from "../components/cardAutores";

import './styles/adminAutores.css';

const Autores = () => {
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getAutors')
            .then(response => response.json())
            .then(data => setAutores(data))
            .catch(error => console.error('Error fetching autores:', error));
    }, []);

    useEffect(() => {
        if (autores.length > 0) {
            const ids = autores.map(autor => autor._id);
            console.log(ids);
        }
    }, [autores]);

    return (
        <>
            <div className="container">
                <div className="row gx-5">
                        <CardAutores autores={autores} />
                </div>
            </div>
        </>
    );
}

export default Autores;