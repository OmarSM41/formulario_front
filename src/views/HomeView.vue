<template>
  
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-indigo-600">Mi Landing Page</h1>
        <nav class="space-x-6">
          <a href="/" class="text-gray-700 hover:text-indigo-600">Inicio</a>
          <a href="/login" class="text-gray-700 hover:text-indigo-600">Iniciar Sesión</a>
          <a href="/register" class="text-gray-700 hover:text-indigo-600">Registrarse</a>
          <a href="/dashboard" class="text-gray-700 hover:text-indigo-600">Dashboard</a>
          <a href="/formulario" class="text-gray-700 hover:text-indigo-600">Formulario</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="flex-1 flex items-center justify-center">
      <div class="text-center max-w-xl mx-auto px-4">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-4">Bienvenido a tu nueva experiencia</h2>
        <p class="text-lg text-gray-600 mb-8">
          Descubre cómo nuestra solución puede ayudarte a crecer y alcanzar tus objetivos.
        </p>
        <a
          href="#"
          class="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          ¡Comienza ahora!
        </a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="mx-auto mb-4 w-16 h-16 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-2xl">
              <span>🚀</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Rápido</h3>
            <p class="text-gray-600">Implementación sencilla y resultados inmediatos.</p>
          </div>
          <div class="text-center">
            <div class="mx-auto mb-4 w-16 h-16 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-2xl">
              <span>🔒</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Seguro</h3>
            <p class="text-gray-600">Tus datos siempre protegidos con la mejor tecnología.</p>
          </div>
          <div class="text-center">
            <div class="mx-auto mb-4 w-16 h-16 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full text-2xl">
              <span>💡</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Innovador</h3>
            <p class="text-gray-600">Soluciones modernas para necesidades actuales.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 py-6 mt-auto">
      <div class="container mx-auto px-4 text-center text-gray-500">
        © 2025 - Todos los derechos reservados.
      </div>
    </footer>
  </div>
</template>

<script setup>
// No logic needed for static landing page
</script>

