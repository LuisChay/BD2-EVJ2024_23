import React,{useState, useEffect} from "react";
//import "../Styles/Perfil.css"
import "../pages/styles/Perfil.css"



function UserProfile(){
	//userPerfil
	//localStorage.getItem('userPerfil').Registro_A
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState({})

    useEffect(() => {
		// Aquí puedes hacer una llamada para obtener los datos del autor usando el authorId
		// Por ejemplo: fetch(`http://localhost:5000/authors/${authorId}`)
		const getUser = async () => {
			try {
			  const url = 'http://localhost:5000/user'; // Cambia esto a tu URL
			  
              const body = JSON.stringify({ userId: userId });
			  
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
			  setUser(data);
			} catch (error) {
			  console.log(error);
			}
		  };
	  
		  getUser();
	  }, [userId]);

    return(
		
        <div className="Perfil">
              <div className="contenedor-perfil">
                  <div className="img-boton">
                      <img className="imagen-perfil" 
                      src={user.profilePhotoUrl} 
                      alt = "Foto Estudiante"/>
  
                          
                  </div>
                  <div className="contenedor-datos">
                  <h1>{`${user.name} ${user.lastName}` } </h1>
                  <h3>{user.role}</h3>
                          <table  id="tablita"   className="table table-bordered table-striped">
                              <tbody>
                                  <tr>
                                      <td>Edad</td>
                                      <td>{user.age}</td>
                                  </tr>
                                  <tr>
                                      <td>Email</td>
                                      <td>{user.email}</td>
                                  </tr>
                                  <tr>
                                      <td>Direccion de Envio</td>
                                      <td>{user.shippingAddress}</td>
                                  </tr>
                                  <tr>
                                      <td>Metodo de Pago</td>
                                      <td>{user.paymentMethod}</td>
                                  </tr>
                              </tbody>
                          </table>
                      
                  </div>
              </div>
          </div>
      );
}

export default UserProfile;