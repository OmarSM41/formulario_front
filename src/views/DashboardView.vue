<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">📋 Panel de Contactos</h1>

    <div v-if="loading" class="text-center text-gray-500">Cargando contactos...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <table v-if="contacts.length > 0" class="w-full table-auto shadow-md rounded-xl overflow-hidden">
      <thead class="bg-blue-600 text-white">
        <tr>
          <th class="p-3">Nombre</th>
          <th class="p-3">Correo</th>
          <th class="p-3">Teléfono</th>
          <th class="p-3">Mensaje</th>
          <th class="p-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in contacts"
          :key="contact.id"
          class="odd:bg-white even:bg-gray-100 hover:bg-blue-50 transition-colors"
        >
          <td class="p-3">{{ contact.nombre }}</td>
          <td class="p-3">{{ contact.correo }}</td>
          <td class="p-3">{{ contact.telefono }}</td>
          <td class="p-3">{{ contact.mensaje }}</td>
          <td class="p-3 flex gap-2 justify-center">
            <button
              class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
              @click="editContact(contact)"
            >
              ✏️ Editar
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              @click="deleteContact(contact.id)"
            >
              🗑️ Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && contacts.length === 0" class="text-center text-gray-500 mt-6">
      No hay contactos registrados.
    </div>

    <div v-if="editing" class="mt-10 p-4 border border-blue-300 bg-blue-50 rounded-lg">
      <h2 class="text-xl font-semibold text-blue-600 mb-4">✏️ Editar Contacto</h2>
      <form @submit.prevent="updateContact">
        <div class="grid grid-cols-2 gap-4">
          <input v-model="form.nombre" class="p-2 border rounded" placeholder="Nombre" />
          <input v-model="form.correo" class="p-2 border rounded" placeholder="Correo" />
          <input v-model="form.telefono" class="p-2 border rounded" placeholder="Teléfono" />
          <input v-model="form.mensaje" class="p-2 border rounded" placeholder="Mensaje" />
        </div>
        <div class="mt-4 flex gap-4">
          <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            💾 Guardar cambios
          </button>
          <button @click="cancelEdit" class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const contacts = ref([])
const loading = ref(true)
const error = ref(null)
const editing = ref(false)
const form = ref({ id: null, nombre: '', correo: '', telefono: '', mensaje: '' })
const router = useRouter()

const fetchContacts = async () => {
  try {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    

    const res = await axios.get('http://localhost:3000/api/contactos', {
      headers: { Authorization: `Bearer ${token}` }
    })

    contacts.value = res.data
  } catch (err) {
    error.value = 'No se pudieron cargar los contactos.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteContact = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este contacto?')) return
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3000/api/contactos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    contacts.value = contacts.value.filter(c => c.id !== id)
  } catch (err) {
    console.error('Error al eliminar:', err)
  }
}

const editContact = (contact) => {
  editing.value = true
  form.value = { ...contact }
}

const cancelEdit = () => {
  editing.value = false
  form.value = { id: null, nombre: '', correo: '', telefono: '', mensaje: '' }
}

const updateContact = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:3000/api/contactos/${form.value.id}`, form.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    contacts.value = contacts.value.map(c => c.id === form.value.id ? { ...form.value } : c)
    cancelEdit()
  } catch (err) {
    console.error('Error al actualizar:', err)
  }
}

onMounted(fetchContacts)
</script>

<style scoped>

</style>
