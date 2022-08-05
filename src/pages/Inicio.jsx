import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";


const Inicio = () => {
  // console.log(import.meta.env.VITE_URLSERVER)

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = `${import.meta.env.VITE_URLSERVER}`
        const response = await fetch(url);
        const result = await response.json();

        setClientes(result);
      } catch (error) {}
    };

    obtenerClientesApi();
  }, []);

  const handleEliminar = async id => {
    const confirmar = confirm('¿Deseas eliminar este cliente?')
    if(confirmar){
      try {
        const url = `${import.meta.env.VITE_URLSERVER}/clientes/${id}`
        const response = await fetch(url, {
          method: "DELETE"
        })
        await response.json()
        
        // Para evitar que se recargue la página usamos el filter donde separamos el cliente eliminado
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)

      } catch (error) {
        alert('No se pudo eliminar el usaurio verifica que todo esté bien')
      }
    }  
  }


  return (
    <>
      <h1 className="font-black text-4xl text-blue-800">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente key={cliente.id} cliente={cliente} 
            handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
