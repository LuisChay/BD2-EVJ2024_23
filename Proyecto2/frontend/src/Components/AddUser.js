import React, { useState } from "react";
//import "../Styles/regUser.css";
import "../pages/styles/regUser.css"

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    paymentMethod: "",
    shippingAddress: "",
    profilePhotoUrl: "", // Para almacenar la imagen en base64
    nameImage: ""
  });

  const [profileImage, setprofileImage] = useState("https://cdn-icons-png.freepik.com/512/1177/1177568.png");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    console.log("holi!!")
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log("si entra", file)
    reader.onloadend = () => {
      
      setFormData({ ...formData, profilePhotoUrl: reader.result, nameImage: file.name});
      setprofileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    const registrar = async () => {
			try {

      

			  const url = 'http://localhost:5000/register'; // Cambia esto a tu URL
			  const body = JSON.stringify(formData);
			  
			  const response = await fetch(url, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: body
			  });
	  
			  if (!response.ok) {
          alert("Error Al registrar Usuario ");
				  throw new Error('ERROR en la respuesta ' + response.statusText);
			  }
	  
			  const data = await response.json();
			  alert(data.message)
			} catch (error) {
			  console.log(error);
			}
		};
	  registrar();
    // Aquí puedes enviar formData a tu backend o manejar los datos como necesites
  };

  return (
    
    <>
      <div className="Perfil">
        <div className="contenedor-perfil">
          <div className="img-boton">
            <img className="imagen-perfil" src={profileImage} alt="Foto Estudiante"/>
            <div className="input-group input-group-sm mb-3">
              <label htmlFor="formFileSm" className="form-label" />
              <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={handleImageChange}/>
            </div>
          </div>
          <div className="contenedor-datos">
            <div className="testbox">
              <form onSubmit={handleSubmit}>
                <p id="h1">Registrar Usuario</p>
                <p id="h4">Name</p>
                <input
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <p id="h4">LastName</p>
                <input
                  name="lastName"
                  placeholder="Enter your lastname"
                  type="text"
                  className="input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <p id="h4">Age</p>
                <input
                  name="age"
                  placeholder="Enter your age"
                  type="text"
                  className="input"
                  value={formData.age}
                  onChange={handleChange}
                />
                <p id="h4">Email<span>*</span></p>
                <input
                  name="email"
                  placeholder="Enter your email"
                  type="text"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p id="h4">Password</p>
                <input
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  className="input"
                  value={formData.password}
                  onChange={handleChange}
                />
                <table>
                  <tbody>
                    <tr>
                      <td className="first-col">Payment Method</td>
                      <td>
                        <input
                          name="paymentMethod"
                          value="Tarjeta"
                          type="radio"
                          checked={formData.paymentMethod === "Tarjeta"}
                          onChange={handleChange}
                        /> Tarjeta
                      </td>
                      <td>
                        <input
                          name="paymentMethod"
                          value="Efectivo"
                          type="radio"
                          checked={formData.paymentMethod === "Efectivo"}
                          onChange={handleChange}
                        /> Efectivo
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p id="h4">Shipping Address</p>
                <input
                  name="shippingAddress"
                  placeholder="Enter your shipping address"
                  type="text"
                  className="input"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                />
                <div className="btn-block">
                  <button type="submit">Registrar Usuario</button>
                </div>
                <p id="h4">_______________________________________________________</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
