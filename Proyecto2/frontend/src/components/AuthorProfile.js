import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
//import "../Styles/Perfil.css"
import "../pages/styles/Perfil.css";



function AuthorProfile(){
	const { authorId } = useParams();

	const [autor, setAutor] = useState({})
	const [books, setBook] = useState([])
	useEffect(() => {
		// Aquí puedes hacer una llamada para obtener los datos del autor usando el authorId
		// Por ejemplo: fetch(`http://localhost:5000/authors/${authorId}`)
		const getAutor = async () => {
			try {
			  const url = 'http://localhost:5000/author'; // Cambia esto a tu URL
			  const body = JSON.stringify({ authorId: authorId });
			  
			  const response = await fetch(url, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: body
			  });
	  
			  if (!response.ok) {
				throw new Error('ERROR en la respuesta ' + response.statusText);
			  }
	  
			  const data = await response.json();
			  setAutor(data);
			  setBook(data.books)
			} catch (error) {
			  console.log(error);
			}
		  };
	  
		  getAutor();
	  }, [authorId]);

    return(
      <div className="Perfil">
			<div className="contenedor-perfil">
				<div className="img-boton">
					<img className="imagen-perfil" 
					src={autor.photoUrl} 
					alt = "Foto Estudiante"/>

					<h2>{autor.name}</h2>
					<p>{autor.biography} </p>
				</div>
				<div className="contenedor-datos">
						<h3>Libros</h3>
						<table  id="tablita"   className="table table-bordered table-striped">
							<thead>
								<tr id="inicioTabla">
									<th scope="col">Titulo</th>
									<th scope="col">Descripción</th>
								</tr>
							</thead>
							<tbody>
								{books.map((libro => (
									<tr key={libro._id}>
										<td>{libro.title}</td>
										<td>{libro.description}</td>
									</tr>
								)))}

							</tbody>
						</table>
					
					
				</div>
			</div>
		</div>
    );
    
}
/*
<div className="contenedor-libros">
						<p><strong>Nombre Completo del Estudiante</strong></p>	
						<p>carnet del Estudiante</p>
						<p>correo del Estudiante</p>
					</div>
*/
export default AuthorProfile;