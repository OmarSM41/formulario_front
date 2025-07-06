<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2" for="name">Nombre</label>
                    <input
                        v-model="form.name"
                        id="name"
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

const form = reactive({
    name: '',
    email: '',
    password: ''
})

function register() {
    // Aquí va la lógica de registro
    alert('Registro enviado:\n' + JSON.stringify(form, null, 2))
}
</script>