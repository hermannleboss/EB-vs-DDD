<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Entity-based E-commerce
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        This e-commerce application is built using an <strong>Entity-based</strong> architecture pattern.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Entity-based Organization</h3>
          <p class="text-gray-600">
            Code is organized around database entities like Users, Products, Orders, etc.
            Each entity has its own controller, routes, and services.
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Structure</h3>
          <p class="text-gray-600">
            - controllers/UserController.ts<br>
            - controllers/ProductController.ts<br>
            - routes/userRoutes.ts<br>
            - routes/productRoutes.ts
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Benefits</h3>
          <p class="text-gray-600">
            Simple to understand, easy to get started, follows REST conventions.
            Good for CRUD operations and straightforward business logic.
          </p>
        </div>
      </div>

      <div class="mt-12">
        <NuxtLink 
          to="/products" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Browse Products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
