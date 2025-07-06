<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <form 
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Formulario de Contacto
      </h2>

      <!-- Campo Nombre -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="nombre">Nombre Completo*</label>
        <input
          id="nombre"
          v-model.trim="form.nombre"
          type="text"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          :class="{ 'border-red-500': errors.nombre }"
        >
        <p v-if="errors.nombre" class="text-red-500 text-sm mt-1">
          {{ errors.nombre }}
        </p>
      </div>

      <!-- Campo Email -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="email">Email*</label>
        <input
          id="email"
          v-model.trim="form.correo"
          type="email"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          :class="{ 'border-red-500': errors.correo }"
        >
        <p v-if="errors.correo" class="text-red-500 text-sm mt-1">
          {{ errors.correo }}
        </p>
      </div>

      <!-- Campo Teléfono -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="telefono">Teléfono*</label>
        <input
          id="telefono"
          v-model.trim="form.telefono"
          type="tel"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          :class="{ 'border-red-500': errors.telefono }"
        >
        <p v-if="errors.telefono" class="text-red-500 text-sm mt-1">
          {{ errors.telefono }}
        </p>
      </div>

      <!-- Campo Mensaje -->
      <div class="mb-6">
        <label class="block text-gray-700 mb-2" for="mensaje">Mensaje*</label>
        <textarea
          id="mensaje"
          v-model.trim="form.mensaje"
          rows="4"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          :class="{ 'border-red-500': errors.mensaje }"
        ></textarea>
        <p v-if="errors.mensaje" class="text-red-500 text-sm mt-1">
          {{ errors.mensaje }}
        </p>
      </div>

      <!-- Widget reCAPTCHA v2 Checkbox -->
      <div class="mb-4">
        <div 
          id="recaptcha-container"
          class="g-recaptcha" 
          data-sitekey="6LctkGwrAAAAAC6Q25pUJItPfEa5C4CoSA7vcSAJ"
          data-theme="light"
          data-callback="onRecaptchaSuccess"
          data-expired-callback="onRecaptchaExpired"
        ></div>
        <p v-if="errors.recaptcha" class="text-red-500 text-sm mt-1">
          {{ errors.recaptcha }}
        </p>
        <p class="text-xs text-gray-500 mt-2">
          Este sitio está protegido por reCAPTCHA y se aplican la
          <a href="https://policies.google.com/privacy" class="text-blue-600 hover:underline" target="_blank">Política de Privacidad</a> y los
          <a href="https://policies.google.com/terms" class="text-blue-600 hover:underline" target="_blank">Términos de Servicio</a> de Google.
        </p>
      </div>

      <!-- Botón de Envío -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex justify-center items-center"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Enviar Mensaje</span>
        <svg 
          v-else 
          class="animate-spin h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>

      <!-- Mensaje de estado -->
      <div 
        v-if="submitMessage" 
        class="mt-4 p-3 rounded-lg"
        :class="{
          'bg-green-100 text-green-700': submitMessage.type === 'success',
          'bg-red-100 text-red-700': submitMessage.type === 'error'
        }"
      >
        {{ submitMessage.text }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

// Estado del formulario
const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: '',
  'g-recaptcha-response': ''
})

// Errores
const errors = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: '',
  recaptcha: ''
})

// Estado de envío
const isSubmitting = ref(false)
const submitMessage = ref(null)

// Sanitización de inputs
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Cargar reCAPTCHA
onMounted(() => {
  const loadRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log('reCAPTCHA listo')
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    window.onRecaptchaLoad = () => {
      console.log('reCAPTCHA cargado')
      window.grecaptcha.render('recaptcha-container', {
        sitekey: '6LctkGwrAAAAAC6Q25pUJItPfEa5C4CoSA7vcSAJ',
        theme: 'light',
        callback: onRecaptchaSuccess,
        'expired-callback': onRecaptchaExpired
      })
    }

    window.onRecaptchaSuccess = (token) => {
      form['g-recaptcha-response'] = token
      errors.recaptcha = ''
    }

    window.onRecaptchaExpired = () => {
      form['g-recaptcha-response'] = ''
      errors.recaptcha = 'El reCAPTCHA ha expirado. Por favor verifica de nuevo.'
    }
  }

  loadRecaptcha()
})

// Validación
const validateForm = () => {
  let isValid = true

  // Sanitizar inputs
  form.nombre = sanitizeInput(form.nombre)
  form.correo = sanitizeInput(form.correo)
  form.telefono = sanitizeInput(form.telefono)
  form.mensaje = sanitizeInput(form.mensaje)

  // Validar nombre
  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es requerido'
    isValid = false
  } else if (form.nombre.trim().length < 3) {
    errors.nombre = 'Mínimo 3 caracteres'
    isValid = false
  } else {
    errors.nombre = ''
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.correo.trim()) {
    errors.correo = 'El email es requerido'
    isValid = false
  } else if (!emailRegex.test(form.correo.trim())) {
    errors.correo = 'Email no válido'
    isValid = false
  } else {
    errors.correo = ''
  }

  // Validar teléfono
  const phoneRegex = /^[0-9]{10,15}$/
  if (!form.telefono.trim()) {
    errors.telefono = 'El teléfono es requerido'
    isValid = false
  } else if (!phoneRegex.test(form.telefono.trim())) {
    errors.telefono = 'Teléfono no válido (10-15 dígitos)'
    isValid = false
  } else {
    errors.telefono = ''
  }

  // Validar mensaje
  if (!form.mensaje.trim()) {
    errors.mensaje = 'El mensaje es requerido'
    isValid = false
  } else if (form.mensaje.trim().length < 10) {
    errors.mensaje = 'Mínimo 10 caracteres'
    isValid = false
  } else {
    errors.mensaje = ''
  }

  // Validar reCAPTCHA
  if (!form['g-recaptcha-response']) {
    errors.recaptcha = 'Por favor completa el reCAPTCHA'
    isValid = false
  } else {
    errors.recaptcha = ''
  }

  return isValid
}

// Envío del formulario
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  submitMessage.value = null

  try {
    const response = await fetch('http://localhost:3000/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: form.nombre,
        correo: form.correo,
        telefono: form.telefono,
        mensaje: form.mensaje,
        'g-recaptcha-response': form['g-recaptcha-response']
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Error al enviar el formulario')
    }

    // Resetear después de éxito
    Object.keys(form).forEach(key => { form[key] = '' })
    window.grecaptcha?.reset()
    
    submitMessage.value = {
      type: 'success',
      text: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.'
    }
  } catch (error) {
    submitMessage.value = {
      type: 'error',
      text: error.message || 'Error al enviar el formulario'
    }
    console.error('Error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Estilos para mejorar la apariencia */
input, textarea {
  transition: all 0.2s ease;
}

.g-recaptcha {
  display: inline-block;
  margin: 10px 0;
}

/* Estilos para los enlaces de términos */
a {
  transition: color 0.2s ease;
}
</style>
