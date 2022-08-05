import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "El nombre debe ser minimo de tres letras")
      .max(30, "El nombre debe ser maximo de treinta letras"),
    empresa: Yup.string()
      .required("El nombre de la empresa es obligatorio")
      .min(3, "El nombre de la empresa debe ser minimo de tres letras")
      .max(30, "El nombre de la empresa debe ser maximo de treinta letras"),
    email: Yup.string()
      .email("Por favor escribe una dirección de correo valida")
      .required("La dirección del correo electronico es obligatorio"),
    telefono: Yup.number()
      .typeError("Deben ser numeros")
      .required("El numero del cliente es obligatorio")
      .integer("Numero no valido")
      .positive("Debe ser un numero valido"),
  })

  const handleSubmit = async (values) => {
    try {
      let response
      if (cliente.id) {
        // Cliente editado
        const url = `http://localhost:4000/clientes/${cliente.id}`
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        // Nuevo registro
        const url = "http://localhost:4000/clientes"
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
      }

      await response.json()
      navigate("/clientes")
      
    } catch (error) {
      console.log(error)
    }
  }
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray font-bold text-xl text-center uppercase">
        {cliente ? "Editar cliente" : "Agregar cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values)
          resetForm()
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombreCliente" className="text-gray-800">
                  Nombre del cliente
                </label>
                <Field
                  id="nombreCliente"
                  type="text"
                  className="mt-2 block w-full bg-gray-100 rounded-md px-3 py-3"
                  placeholder="Escribe el nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresaCliente" className="text-gray-800">
                  Empresa del cliente
                </label>
                <Field
                  id="empresaCliente"
                  type="text"
                  className="mt-2 block w-full bg-gray-100 rounded-md px-3 py-3"
                  placeholder="Escribe el nombre de la empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="correoCliente" className="text-gray-800">
                  Correo electronico del cliente
                </label>
                <Field
                  id="correoCliente"
                  type="email"
                  className="mt-2 block w-full bg-gray-100 rounded-md px-3 py-3"
                  placeholder="Escribe el nombre de la empresa del cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefonoCliente" className="text-gray-800">
                  Telefono del cliente
                </label>
                <Field
                  id="telefonoCliente"
                  type="tel"
                  className="mt-2 block w-full bg-gray-100 rounded-md px-3 py-3"
                  placeholder="Escribe el numero telefonico del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notasCliente" className="text-gray-800">
                  Notas del cliente
                </label>
                <Field
                  as="textarea"
                  id="notasCliente"
                  type="tel"
                  className="mt-2 block w-full bg-gray-100 rounded-md px-3 py-3 resize-none h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
                {errors.notas && touched.notas ? (
                  <Alerta>{errors.notas}</Alerta>
                ) : null}
              </div>

              <input
                type="submit"
                value={cliente ? "Guardar cambios" : "Guardar cliente"}
                className="mt-5 w-full bg-blue-800 text-white text-lg p-3 rounded-md cursor-pointer hover:bg-blue-700"
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

// De esta manera si no pasamos props como en este casos e reutiliza un componente
// DefaultProps entra y define el prop

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
}

export default Formulario;
