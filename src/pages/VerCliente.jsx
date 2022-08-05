import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner"

const VerCliente = () => {
  const [cliente, setCliente] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const { nombre, empresa, email, telefono, notas } = cliente;
  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando)
    };
    obtenerClienteApi();
  }, []);

  // hayCliente = Object.keys(cliente)
  // console.log(hayCliente)

  return (
    cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (

      <div>
          <>
          <h1 className="font-black text-4xl text-blue-800">
            Ver cliente: {nombre}
          </h1>
          <p className="mt-3">Información del cliente</p>
          <p className="text-2xl text-gray-600">
            <span className="text-gray-800 mt-4 uppercase font-bold">
              Cliente:{" "}
            </span>
            {nombre}
          </p>
          <p className="text-2xl text-gray-600">
            <span className="text-gray-800 mt-4 uppercase font-bold">Email: </span>
            {email}
          </p>
          <p className="text-2xl text-gray-600">
            <span className="text-gray-800 mt-4 uppercase font-bold">
              Conctacto:{" "}
            </span>
            {telefono}
          </p>
          <p className="text-2xl text-gray-600">
            <span className="text-gray-800 mt-4 uppercase font-bold">
              Empresa:{" "}
            </span>
            {empresa}
          </p>
          {notas && (
            <p className="text-2xl text-gray-600">
              <span className="text-gray-800 mt-4 uppercase font-bold">
                Notas:{" "}
              </span>
              {notas}
            </p>
          )}
          </>
      </div>
      
    )
  );
};

export default VerCliente;
