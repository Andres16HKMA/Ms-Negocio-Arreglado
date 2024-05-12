import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env';


// Función para obtener el ID de un usuario específico
async function obtenerIdUsuario(usuarioId) {
  try {
    const respuesta = await axios.get(`${Env.get('MS_SECURITY')}/api/public/user/${usuarioId}`)
    // Suponiendo que la respuesta contiene un objeto JSON con los datos del usuario
    // Aquí podrías extraer el ID del usuario y devolverlo
    return respuesta.data.id
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener el ID del usuario:', error)
    throw error
  }
}

// Ejemplo de uso de la función para obtener el ID de un usuario específico
const usuarioId = 123 // ID del usuario que quieres obtener
obtenerIdUsuario(usuarioId)
  .then(id => {
    console.log('ID del usuario:', id)
    // Ahora puedes utilizar este ID en tu migración de Adonis u en cualquier otro lugar donde lo necesites
  })
  .catch(error => {
    console.error('Error:', error)
  })
