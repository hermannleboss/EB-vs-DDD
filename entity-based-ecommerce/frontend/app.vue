<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              Entity-based E-commerce
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/products" class="text-gray-700 hover:text-gray-900">Products</NuxtLink>
            <NuxtLink to="/cart" class="text-gray-700 hover:text-gray-900">Cart</NuxtLink>
            <NuxtLink to="/login" class="text-gray-700 hover:text-gray-900">Login</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-16">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p class="text-center">© 2025 Entity-based E-commerce. Built with Entity-based architecture.</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global styles will be added here */
</style>
