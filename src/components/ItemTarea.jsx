import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from "react";

const ItemTarea = ({itemTarea, borrarTarea, editarTarea}) => {
    const [modalShow, setModalShow] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const [taskId, setTaskId] = useState('');

    const handleEditClick = (itemTarea) => {
        setTaskId(itemTarea._id);
        setEditedTask(itemTarea.tarea);
        setModalShow(true);
    };

    const handleSave = () => {
        if(editedTask){
            editarTarea(taskId, editedTask);
        }
        else{
            alert('No se puede guardar Valores en blanco')
        }
        setModalShow(false);
    };



    return (
        <ListGroup.Item className="d-flex justify-content-between item">
            <span>{itemTarea.tarea}</span>
            <Button variant="warning" onClick={() => handleEditClick(itemTarea)} className="me-3 text-white">Editar <i className="bi bi-pencil-square mx-1"></i>
</Button>
            <Button variant="danger" onClick={()=>{borrarTarea(itemTarea._id)}}>Borrar <i className="bi bi-trash-fill mx-1"></i></Button>
           
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        required
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </ListGroup.Item>
    );
};

export default ItemTarea;