import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, notas, id } = cliente;

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="pt-3">{nombre}</td>
      <td className="pt-3">
        <p>
          <span className="text-gray uppercase font-bold">Email: </span>{" "}
          <span>{email}</span>
        </p>
        <p>
          <span className="text-gray uppercase font-bold">Telefono:</span>{" "}
          <span>{telefono}</span>
        </p>
      </td>
      <td className="pt-3">{empresa}</td>
      <td className="pt-3">
        <button
          type="button"
          className="mt-3 bg-green-600 hover:bg-green-700 block w-full p-2 uppercase font-bold text-xs text-white"
          onClick={() => navigate(`/clientes/${id}`) }
        >
          Ver
        </button>
        <button
          type="button"
          className="mt-3 bg-blue-600 hover:bg-blue-700 block w-full p-2 uppercase font-bold text-xs text-white"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="mt-3 bg-red-600 hover:bg-red-700 block w-full p-2 uppercase font-bold text-xs text-white"
          onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
