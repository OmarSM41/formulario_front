<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">Nombre de usuario</label>
          <input
            v-model="form.username"
            id="username"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">Correo Electrónico</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="password">Contraseña</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Registrarse
        </button>
      </form>
      <p class="mt-4 text-center text-gray-600">
        ¿Ya tienes una cuenta?
        <a href="/login" class="text-blue-600 hover:underline">Inicia sesión</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: ''
})

async function register() {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      username: form.username,
      email: form.email,
      password: form.password
    })

    alert('Registro exitoso, ya puedes iniciar sesión.')
    router.push('/login')

  } catch (error) {
    console.error(error)
    if (error.response && error.response.data && error.response.data.error) {
      alert('Error: ' + error.response.data.error)
    } else {
      alert('Error en el registro, intenta de nuevo.')
    }
  }
}
</script>
