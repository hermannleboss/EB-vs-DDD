<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Domain-based E-commerce
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        This e-commerce application is built using a <strong>Domain-based (DDD)</strong> architecture pattern.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Domain-driven Design</h3>
          <p class="text-gray-600">
            Code is organized around business domains like User Management, 
            Product Catalog, Order Processing, etc. Each domain encapsulates its own logic.
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Structure</h3>
          <p class="text-gray-600">
            - domains/user/domain/entities.ts<br>
            - domains/user/application/services.ts<br>
            - domains/product/domain/entities.ts<br>
            - domains/order/application/services.ts
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Benefits</h3>
          <p class="text-gray-600">
            Better separation of concerns, scalable architecture, 
            aligns with business requirements, and easier to maintain complex business logic.
          </p>
        </div>
      </div>

      <div class="mt-12">
        <NuxtLink 
          to="/products" 
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Browse Products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
