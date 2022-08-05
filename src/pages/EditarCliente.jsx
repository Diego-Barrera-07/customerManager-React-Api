import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";


const EditarCliente = () => {
  const [cliente, setCliente] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `${import.meta.env.VITE_URLSERVER}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteApi();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-800">Editar cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar tu cliente</p>
      {cliente.nombre ? (
        <Formulario 
        cliente={cliente}
        cargando={cargando}
        />
      ) : "No se puede editar un cliente que no existe"}
    </>
  );
};

export default EditarCliente;
