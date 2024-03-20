import { ListGroup } from "react-bootstrap";
import ItemTarea from "./ItemTarea";

const ListaTarea = ({listaTarea, borrarTarea, editarTarea}) => {

    return (
        <ListGroup>
            {
                listaTarea
                ?listaTarea.map((itemTarea) => <ItemTarea key={itemTarea._id} itemTarea={itemTarea} borrarTarea={borrarTarea} editarTarea={editarTarea}></ItemTarea>)
                :<p>No hay tareas para mostrar</p>
            }
        </ListGroup>
    );
};

export default ListaTarea;