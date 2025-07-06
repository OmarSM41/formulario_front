<template>
    <div class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 class="text-2xl font-bold mb-4 md:mb-0">Dashboard de Contactos</h1>
                <div class="flex gap-2">
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Buscar por nombre, correo..."
                        class="border rounded px-3 py-2 focus:outline-none focus:ring w-64"
                    />
                    <button
                        @click="clearSearch"
                        class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            <div v-if="filteredContacts.length === 0" class="text-center text-gray-500 py-10">
                No hay contactos registrados.
            </div>

            <div v-else class="overflow-x-auto">
                <table class="min-w-full bg-white border rounded">
                    <thead>
                        <tr class="bg-gray-100 text-left">
                            <th class="py-2 px-4 border-b">Nombre</th>
                            <th class="py-2 px-4 border-b">Correo</th>
                            <th class="py-2 px-4 border-b">Teléfono</th>
                            <th class="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="contact in filteredContacts"
                            :key="contact.id"
                            class="hover:bg-gray-50"
                        >
                            <td class="py-2 px-4 border-b">{{ contact.nombre }}</td>
                            <td class="py-2 px-4 border-b">{{ contact.correo }}</td>
                            <td class="py-2 px-4 border-b">{{ contact.telefono }}</td>
                            <td class="py-2 px-4 border-b flex gap-2">
                                <button
                                    @click="showDetails(contact)"
                                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Detalles
                                </button>
                                <button
                                    @click="deleteContact(contact.id)"
                                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal Detalles -->
            <div
                v-if="selectedContact"
                class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h2 class="text-xl font-bold mb-4">Detalles del Contacto</h2>
                    <div class="mb-2"><span class="font-semibold">Nombre:</span> {{ selectedContact.nombre }}</div>
                    <div class="mb-2"><span class="font-semibold">Correo:</span> {{ selectedContact.correo }}</div>
                    <div class="mb-2"><span class="font-semibold">Teléfono:</span> {{ selectedContact.telefono }}</div>
                    <div class="mb-2"><span class="font-semibold">Mensaje:</span> {{ selectedContact.mensaje }}</div>
                    <div class="mt-6 text-right">
                        <button
                            @click="selectedContact = null"
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos de ejemplo (reemplaza con tu fuente de datos real)
const contacts = ref([
    {
        id: 1,
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        telefono: '123456789',
        mensaje: 'Hola, me gustaría saber más sobre sus servicios.'
    },
    {
        id: 2,
        nombre: 'Ana Gómez',
        correo: 'ana@example.com',
        telefono: '987654321',
        mensaje: 'Tengo una consulta sobre el formulario.'
    }
])

const search = ref('')
const selectedContact = ref(null)

const filteredContacts = computed(() => {
    if (!search.value) return contacts.value
    const term = search.value.toLowerCase()
    return contacts.value.filter(
        c =>
            c.nombre.toLowerCase().includes(term) ||
            c.correo.toLowerCase().includes(term) ||
            c.telefono.toLowerCase().includes(term)
    )
})

function showDetails(contact) {
    selectedContact.value = contact
}

function deleteContact(id) {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
        contacts.value = contacts.value.filter(c => c.id !== id)
        if (selectedContact.value && selectedContact.value.id === id) {
            selectedContact.value = null
        }
    }
}

function clearSearch() {
    search.value = ''
}
</script>