<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      class="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Formulario de Contacto</h2>
      <div>
        <label class="block text-gray-700 mb-1" for="nombre">Nombre Completo</label>
        <input
          id="nombre"
          v-model="form.nombre"
          type="text"
          required
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label class="block text-gray-700 mb-1" for="correo">Correo</label>
        <input
          id="correo"
          v-model="form.correo"
          type="email"
          required
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label class="block text-gray-700 mb-1" for="telefono">Teléfono</label>
        <input
          id="telefono"
          v-model="form.telefono"
          type="tel"
          required
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label class="block text-gray-700 mb-1" for="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          v-model="form.mensaje"
          required
          rows="4"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: ''
})

function handleSubmit() {
  // Aquí puedes manejar el envío del formulario
  alert('Formulario enviado:\n' + JSON.stringify(form, null, 2))
}
</script>
