import './App.css'
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer'
import FormularioTarea from './components/FormularioTarea'


function App() {

  return ( 
    <>
      <Container className='py-4' id='main'>
      <div className='text-center text-white mb-4'>
          <h1>¡Bienvenido!</h1>
          <h4>Ingresa tus tareas:</h4>
        </div>
        <FormularioTarea></FormularioTarea>
      </Container>
      <Footer></Footer>
    </>     
  )
}

export default App
