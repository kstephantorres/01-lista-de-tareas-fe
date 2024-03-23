const URL_tareas = import.meta.env.VITE_API_TAREAS
const URL_tarea = import.meta.env.VITE_API_TAREA
console.log("🚀 ~ URL_tarea:", URL_tarea)

console.log("🚀 ~ URL_tareas:", URL_tareas)


export const leerTareasAPI = async()=>{
    try {
        const response = await fetch(URL_tareas)
        const listaTareas = await response.json()
        return listaTareas
        
    } catch (error) {
        console.log("🚀 ~ leerTareasAPI ~ error:", error)
        
    }
}
export const crearTareaAPI = async(tareaNueva)=>{
    try {
        const response = await fetch(URL_tareas, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({tarea: tareaNueva.trim()})
        })
        return response;
    } catch (error) {
        console.log("🚀 ~ crearTareaAPI ~ error:", error)
    }
} 


export const borrarTareaAPI=async(id)=>{
    try {
        const response = await fetch(`${URL_tarea}/${id}`, {
            method: "DELETE"
        })
        console.log("🚀 ~ borrarTareaAPI ~ response:", response)
        return response;
    } catch (error) {
        console.log("🚀 ~ borrarTareaAPI ~ error:", error)
    }
}
//.map

export const editarTareaAPI = async(id, itemTarea)=>{
    try {
        const response = await fetch(`${URL_tarea}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify({tarea: itemTarea})
        })
        return response;
    } catch (error) {
        console.log("🚀 ~ editarTareaAPI ~ error:", error)
    }
}