import React, { useState, useEffect } from 'react';

export  function AdminLibros() {
    const [libros, setLibros] = useState([]);
    const [autores, setAutores] = useState([]); // Estado para almacenar la lista de autores
    const [showModalNuevo, setShowModalNuevo] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [libroIdActual, setLibroIdActual] = useState(null);
    const [nuevoLibro, setNuevoLibro] = useState({
        title: '',
        authorId: '',
        description: '',
        genre: '',
        publicationDate: '',
        price: '',
        stock: '',
        imageUrl: '',  // Esta será la imagen en base64
        averageRating: 0
    });

    useEffect(() => {
        // Obtener lista de libros
        fetch('http://localhost:5000/libros/getlibros')
            .then(response => response.json())
            .then(data => setLibros(data))
            .catch(error => console.error('Error fetching libros:', error));

        // Obtener lista de autores
        fetch('http://localhost:5000/autores')
            .then(response => response.json())
            .then(data => setAutores(data))
            .catch(error => console.error('Error fetching autores:', error));
    }, []);

    const toggleModalNuevo = () => {
        setNuevoLibro({
            title: '',
            authorId: '',
            description: '',
            genre: '',
            publicationDate: '',
            price: '',
            stock: '',
            imageUrl: '',  // Limpiamos la imagen al abrir el modal nuevo
            averageRating: 0
        });
        setShowModalNuevo(!showModalNuevo);
    };

    const toggleModalEditar = (libro) => {
        if (libro) {
            setNuevoLibro({
                title: libro.title,
                authorId: libro.authorId,
                description: libro.description,
                genre: libro.genre,
                publicationDate: libro.publicationDate,
                price: libro.price,
                stock: libro.stock,
                imageUrl: libro.imageUrl,  // Mantenemos la imagen existente al editar
                averageRating: libro.averageRating
            });
            setLibroIdActual(libro._id);
        } else {
            setNuevoLibro({
                title: '',
                authorId: '',
                description: '',
                genre: '',
                publicationDate: '',
                price: '',
                stock: '',
                imageUrl: '',
                averageRating: 0
            });
            setLibroIdActual(null);
        }
        setShowModalEditar(!showModalEditar);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoLibro({ ...nuevoLibro, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNuevoLibro({ ...nuevoLibro, imageUrl: reader.result });  // Almacena la imagen en base64
        };
        reader.readAsDataURL(file);
    };

    const handleAgregarLibro = async () => {
        try {
            // Preparar el objeto para enviar, incluyendo la imagen en base64 si está presente
            const libroToAdd = {
                ...nuevoLibro,
                imageUrl: nuevoLibro.imageUrl.startsWith('data:image') ? nuevoLibro.imageUrl : ''
            };

            console.log(libroToAdd);

            const response = await fetch('http://localhost:5000/libros/addlibro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(libroToAdd),
            });
            if (response.ok) {
                const data = await response.json();
                setLibros([...libros, data]);
                toggleModalNuevo();
            } else {
                console.error('Error al agregar libro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar libro:', error);
        }
    };

    const handleGuardarCambios = async () => {
        try {
            const response = await fetch(`http://localhost:5000/libros/editlibro/${libroIdActual}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoLibro),
            });
            if (response.ok) {
                const data = await response.json();
                setLibros(libros.map(libro => (libro._id === data._id ? data : libro)));
                toggleModalEditar(null);
            } else {
                console.error('Error al editar libro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al editar libro:', error);
        }
    };

    const handleEliminarLibro = async (libroId) => {
        // Mostrar confirmación antes de eliminar
        const confirmarEliminar = window.confirm('¿Estás seguro que deseas eliminar este libro?');

        if (!confirmarEliminar) {
            return; // Si el usuario cancela, salir de la función
        }

        try {
            const response = await fetch(`http://localhost:5000/libros/deletelibro/${libroId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                alert('Libro eliminado correctamente');
                setLibros(libros.filter(libro => libro._id !== libroId));
            } else {
                console.error('Error al eliminar libro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar libro:', error);
        }
    };

    return (
        <div>
            <h1 className="text-center">Libros</h1>
            <div style={{ width: '18rem' }}>
                <div className="card-body">
                    <button className="btn btn-primary mb-2" onClick={toggleModalNuevo}>Agregar Nuevo Libro</button>
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-around">
                {libros.map(libro => (
                    <div key={libro._id} className="card m-2" style={{ width: '18rem' }}>
                        <img className="card-img-top img-thumbnail" src={libro.imageUrl} alt={libro.title} />
                        <div className="card-body">
                            <h5 className="card-title">{libro.title}</h5>
                            <p className="card-text">Autor: {libro.authorId ? libro.authorId.name : 'Autor desconocido'}</p>
                            <p className="card-text">Descripción: {libro.description}</p>
                            <p className="card-text">Género: {libro.genre}</p>
                            <p className="card-text">Fecha de publicación: {new Date(libro.publicationDate).toLocaleDateString()}</p>
                            <p className="card-text">Precio: ${libro.price}</p>
                            <p className="card-text">Stock disponible: {libro.stock}</p>
                            <p className="card-text">Promedio de valoración: {libro.averageRating}</p>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-warning" onClick={() => toggleModalEditar(libro)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleEliminarLibro(libro._id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para agregar nuevo libro */}
            <div className={`modal ${showModalNuevo ? 'show' : ''}`} style={{ display: showModalNuevo ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar Nuevo Libro</h5>
                            <button type="button" className="close" onClick={toggleModalNuevo}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Título</label>
                                    <input type="text" className="form-control" id="title" name="title" value={nuevoLibro.title} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="authorId">Autor</label>
                                    <select className="form-control" id="authorId" name="authorId" value={nuevoLibro.authorId} onChange={handleChange}>
                                        <option value="">Selecciona un autor</option>
                                        {autores.map(author => (
                                            <option key={author._id} value={author._id}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea className="form-control" id="description" name="description" value={nuevoLibro.description} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label                                    htmlFor="genre">Género</label>
                                    <input type="text" className="form-control" id="genre" name="genre" value={nuevoLibro.genre} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="publicationDate">Fecha de publicación</label>
                                    <input type="date" className="form-control" id="publicationDate" name="publicationDate" value={nuevoLibro.publicationDate} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Precio</label>
                                    <input type="number" className="form-control" id="price" name="price" value={nuevoLibro.price} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" className="form-control" id="stock" name="stock" value={nuevoLibro.stock} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imageUrl">Imagen (URL o subir archivo)</label>
                                    <input type="file" className="form-control-file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModalNuevo}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleAgregarLibro}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para editar libro */}
            <div className={`modal ${showModalEditar ? 'show' : ''}`} style={{ display: showModalEditar ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Libro</h5>
                            <button type="button" className="close" onClick={() => toggleModalEditar(null)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Título</label>
                                    <input type="text" className="form-control" id="title" name="title" value={nuevoLibro.title} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="authorId">Autor</label>
                                    <select className="form-control" id="authorId" name="authorId" value={nuevoLibro.authorId} onChange={handleChange}>
                                        <option value="">Selecciona un autor</option>
                                        {autores.map(author => (
                                            <option key={author._id} value={author._id}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea className="form-control" id="description" name="description" value={nuevoLibro.description} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genre">Género</label>
                                    <input type="text" className="form-control" id="genre" name="genre" value={nuevoLibro.genre} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="publicationDate">Fecha de publicación</label>
                                    <input type="date" className="form-control" id="publicationDate" name="publicationDate" value={nuevoLibro.publicationDate} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Precio</label>
                                    <input type="number" className="form-control" id="price" name="price" value={nuevoLibro.price} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" className="form-control" id="stock" name="stock" value={nuevoLibro.stock} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imageUrl">Imagen (URL o subir archivo)</label>
                                    <input type="file" className="form-control-file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => toggleModalEditar(null)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleGuardarCambios}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminLibros