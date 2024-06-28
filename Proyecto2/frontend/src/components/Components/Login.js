import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
//import "../Styles/login.css";
import "../pages/styles/login.css";

function Login() {
    const navigate = useNavigate(); // Hook para navegación
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            
            // Limpiar localStorage antes de guardar el nuevo usuario
            localStorage.clear();

            // Guarda el ID del usuario en localStorage
            localStorage.setItem('userId', data._id); // Suponiendo que el ID del usuario está en data._id

            // Redirige al usuario después del inicio de sesión exitoso
            navigate('/Perfil'); // Cambia '/Cards' por la ruta a la que quieres redirigir
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login wrap">
                <div className="h1">Login</div>
                <input 
                    placeholder="Email" 
                    id="email" 
                    name="email" 
                    type="text" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <input 
                    placeholder="Password" 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <input 
                    value="Login" 
                    className="btn" 
                    type="submit" 
                />
            </form>
        </div>
    );
}

export default Login;
