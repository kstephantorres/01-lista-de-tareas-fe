import { ListGroup } from "react-bootstrap";
import ItemTarea from "./ItemTarea";

const ListaTarea = ({listaTarea, borrarTarea, editarTarea}) => {

    return (
        <ListGroup>
            {
                listaTarea.map((itemTarea) => <ItemTarea key={itemTarea._id} itemTarea={itemTarea} borrarTarea={borrarTarea} editarTarea={editarTarea}></ItemTarea>)
            }
        </ListGroup>
    );
};

export default ListaTarea;