import { Form, Button } from "react-bootstrap";
import ListaTarea from './ListaTarea'
import { useEffect, useState, useRef } from "react";
import { borrarTareaAPI, crearTareaAPI, leerTareasAPI, editarTareaAPI } from "../helpers/queries";
import Swal from "sweetalert2";
import ItemTarea from "./ItemTarea";

const FormularioTarea = () => {
    const [tarea, setTarea]= useState('');
    const [listaTarea, setListaTarea] =  useState([])
    const [busqueda, setBusqueda] = useState('');
    const taskInputRef = useRef(null)

    const consultarAPI = async()=>{
        try {
            const response = await leerTareasAPI()
            setListaTarea(response)
        } catch (error) {
            console.log("🚀 ~ consultarAPI ~ error:", error)
        }       
    }

    useEffect(()=>{
        consultarAPI()
    },[])

    // handle+algo nombre de funciones para el manejo de states 
    const handleSubmit =async(e)=>{
        e.preventDefault()
            const response = await crearTareaAPI(tarea)
            if(response.status === 201)
            {
                console.log("Tarea creada")
                consultarAPI()
            }
            else{
                console.log("No se pudo crear la tarea")
            }
        taskInputRef.current && taskInputRef.current.focus()
    }

    const borrarTarea=(idTarea)=>{
        Swal.fire({
            title: "¿Estas seguro de eliminar esta tarea?",
            text: "No se puede revertir este proceso",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {
              const response = await borrarTareaAPI(idTarea)
              if(response.status === 200){
                Swal.fire({
                    title: "¡Producto eliminado!",
                    text: `La tarea fue eliminada correctamente`,
                    icon: "success"
                  });
                consultarAPI()
              }else{
                Swal.fire({
                    title: "¡Ocurrio un error!",
                    text: `La tarea no fue eliminada. Intentelo nuevamente más tarde.`,
                    icon: "error"
                  });
              }
            }
          });
        
    }

    const editarTarea = async (idTarea, nuevaTarea) => {
        try {
            const response = await editarTareaAPI(idTarea, nuevaTarea);
            if (response.status === 200) {
                console.log("Tarea editada");
                consultarAPI();
            } else {
                console.log("No se pudo editar la tarea");
            }
        } catch (error) {
            console.log("Error al editar la tarea:", error);
        }
    };

    const handleBuscar = () => {
        const tareasFiltradas = listaTarea.filter(ItemTarea =>
            ItemTarea.tarea.toLowerCase().includes(busqueda.toLowerCase())
        );
        setListaTarea(tareasFiltradas);
    }

    const mostrarTodasLasTareas=()=>{
        consultarAPI()
    }

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
                    <Form.Control 
                        type="text" 
                        placeholder="Ej: Tarea 1" 
                        minLength={3} 
                        maxLength={80} 
                        onChange={(e)=> setTarea(e.target.value)} 
                        value={tarea}
                        ref={taskInputRef}
                        required
                    />
                    <Button variant="dark" className="ms-2" type="submit"> Agregar </Button>
                </Form.Group> 
            </Form>
            <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput2">
                <Form.Control 
                    type="text" 
                    placeholder="Buscar tarea" 
                    onChange={(e)=> setBusqueda(e.target.value)} 
                    value={busqueda}
                />
                <Button variant="primary" className="ms-2" onClick={handleBuscar}><i className="bi bi-search"></i></Button>
                <Button variant="success" onClick={mostrarTodasLasTareas} className="ms-2"><i className="bi bi-arrow-clockwise"></i></Button>
            </Form.Group>
            <ListaTarea listaTarea={listaTarea} borrarTarea={borrarTarea} editarTarea={editarTarea}></ListaTarea>
        </section>
    );
};

export default FormularioTarea;