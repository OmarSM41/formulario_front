<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
            <form @submit.prevent="onSubmit">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="email">Correo electrónico</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="ejemplo@correo.com"
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
                <a href="#" class="text-blue-600 hover:underline">Regístrate</a>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function onSubmit() {
    // Lógica de autenticación aquí
    alert(`Email: ${email.value}\nPassword: ${password.value}`)
}
</script>