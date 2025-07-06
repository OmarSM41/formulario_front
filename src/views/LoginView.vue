<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">Nombre de usuario</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Usuario"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </form>
      <p class="mt-4 text-center text-gray-600">
        ¿No tienes una cuenta?
        <a href="/register" class="text-blue-600 hover:underline">Regístrate</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value
    })

    const { token, user } = response.data

    // Guardamos en localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    // Redirige según el rol
    if (user.role === 'admin') {
      router.push('/dashboard')
    } else {
      router.push('/home')
    }

  } catch (error) {
    alert('Credenciales inválidas o error de conexión')
    console.error(error)
  }
}
</script>
