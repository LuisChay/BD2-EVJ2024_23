import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CardAutores = ({ autores }) => {

    const deleteAutor = async (id) => {

        try {
            const response = await fetch(`http://localhost:5000/deleteAutor/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Autor eliminado', id);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Autor eliminado con éxito."
                });
            } else {
                console.error('Error al eliminar autor:', response.statusText);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Error al eliminar autor."
                });
            }
        } catch (error) {
            console.error('Error al eliminar autor:', error);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Algo inesperado sucedió. Intente de nuevo más tarde."
            });
        }

    }


    const agregarAutor = (nombre) => {
        var nombreAutor =""
        var biografiaAutor = ""
        var imagenAutor = ""
        
        
        console.log("Agregar autor", nombre);
    }

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => agregarAutor("Elmer")}>Agregar autor</button>
            <div className="col">
                {autores.map(autor => (
                    <figure key={autor._id} className="snip1336"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample69.jpg" alt="sample69" />
                        <figcaption>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg" alt="profile-sample5" className="profile" />
                            <h2>{autor.name}<span>Accountant</span></h2>
                            <p>{autor.biography}</p>
                            <a className="follow" onClick={() => deleteAutor(autor._id)}>Eliminar</a>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </>
    );

}


export default CardAutores;