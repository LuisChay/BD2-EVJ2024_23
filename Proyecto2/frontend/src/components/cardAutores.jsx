import React from "react";
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

    const agregarAutor = async () => {
        try {
            let imageBase64 = '';

            var handleImageChange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    imageBase64 = reader.result;
                };
                reader.readAsDataURL(file);
            };

            // Formulario para el ingreso de datos
            const { value: formValues } = await Swal.fire({
                title: "AGREGAR LIBRO",
                html: `
                    <input id="swal-nombre" class="swal2-input" placeholder="Nombre del autor">
                    <input id="swal-biografia" class="swal2-input" placeholder="Biografía">
                    <input id="swal-image" class="swal2-input" type="file" accept="image/png, image/jpeg"/>
                `,
                icon: "info",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Agregar",
                showCancelButton: true,
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: true,
                didOpen: () => {
                    document.getElementById("swal-image").addEventListener("change", handleImageChange);
                },
                preConfirm: async () => {
                    return {
                        name: document.getElementById("swal-nombre").value,
                        biography: document.getElementById("swal-biografia").value,
                        photoUrl: imageBase64,
                        books: []
                    };
                },
            });

            // El formulario está lleno, lo enviamos al endpoint addAutor
            if (formValues) {
                console.log(formValues);
                fetch('http://localhost:5000/addAutor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify(formValues),
                })
                    .then((res) => res.json())
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: err,
                        });
                    })
                    .then((response) => {
                        if (response) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                },
                            });
                            Toast.fire({
                                icon: "success",
                                title: "Autor agregado con exito.",
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Ocurrio un error inesperado, intentelo de nuevo.",
                            });
                        }
                    });
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error inesperado, intentelo de nuevo.",
            });
        }
    };


    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => agregarAutor()}>Agregar autor</button>
            <div className="col">
                {autores.map(autor => (
                    <figure key={autor._id} className="snip1336"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample69.jpg" alt="sample69" />
                        <figcaption>
                            <img src={autor.photoUrl} alt="profile-sample5" className="profile" />
                            <h2>{autor.name}<span>Biografía</span></h2>
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