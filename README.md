# E-commerce Architecture Comparison: Entity-based vs Domain-based

This project demonstrates two different architectural approaches for building an e-commerce application:

## 🏢 Entity-based E-commerce
**Port: 3001 (Backend) | 3000 (Frontend)**

### Architecture Overview
The entity-based approach organizes code around database entities and follows a traditional MVC pattern.

### Structure
```
entity-based-ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Business logic by entity
│   │   │   ├── UserController.ts
│   │   │   ├── ProductController.ts
│   │   │   ├── OrderController.ts
│   │   │   └── CartController.ts
│   │   ├── routes/              # HTTP routes by entity
│   │   │   ├── userRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   └── orderRoutes.ts
│   │   ├── middleware/          # Shared middleware
│   │   │   └── auth.ts
│   │   └── index.ts            # Express app setup
│   └── prisma/
│       └── schema.prisma       # Database schema
└── frontend/                   # Nuxt.js frontend
```

### Characteristics
- ✅ **Simple to understand** - follows familiar REST conventions
- ✅ **Quick to get started** - straightforward file organization
- ✅ **Good for CRUD operations** - each entity has its own controller
- ⚠️ **Can become complex** - as business logic grows, controllers become large
- ⚠️ **Cross-cutting concerns** - business rules spanning multiple entities are harder to manage

---

## 🎯 Domain-based E-commerce (DDD)
**Port: 3002 (Backend) | 3001 (Frontend)**

### Architecture Overview
The domain-based approach organizes code around business domains and follows Domain-Driven Design principles.

### Structure
```
domain-based-ecommerce/
├── backend/
│   ├── src/
│   │   ├── domains/
│   │   │   ├── user/
│   │   │   │   ├── domain/          # Business entities & interfaces
│   │   │   │   │   ├── entities.ts
│   │   │   │   │   └── repositories.ts
│   │   │   │   ├── application/     # Use cases & services
│   │   │   │   │   └── services.ts
│   │   │   │   └── infrastructure/  # External concerns
│   │   │   │       └── routes.ts
│   │   │   ├── product/
│   │   │   │   └── [same structure]
│   │   │   ├── order/
│   │   │   │   └── [same structure]
│   │   │   └── cart/
│   │   │       └── [same structure]
│   │   └── index.ts
│   └── prisma/
│       └── schema.prisma
└── frontend/                       # Nuxt.js frontend
```

### Characteristics
- ✅ **Better separation of concerns** - each domain is self-contained
- ✅ **Scalable architecture** - easier to add new domains
- ✅ **Business-focused** - aligns with business requirements
- ✅ **Testable** - clear boundaries between layers
- ⚠️ **More complex setup** - requires understanding of DDD principles
- ⚠️ **Initial overhead** - more files and structure to manage

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Entity-based Setup
```bash
# Backend
cd entity-based-ecommerce/backend
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend (new terminal)
cd entity-based-ecommerce/frontend
npm install
npm run dev
```

### Domain-based Setup
```bash
# Backend
cd domain-based-ecommerce/backend
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend (new terminal)
cd domain-based-ecommerce/frontend
npm install
npm run dev
```

---

## 📊 Comparison

| Aspect | Entity-based | Domain-based |
|--------|-------------|--------------|
| **Learning Curve** | Low | Medium-High |
| **Initial Setup** | Fast | Slower |
| **Maintainability** | Good for small projects | Better for large projects |
| **Business Logic** | Mixed with data access | Clearly separated |
| **Testing** | Controller-based | Domain service-based |
| **Team Collaboration** | Simple | Better boundaries |
| **Scalability** | Limited | Excellent |

---

## 🎯 When to Use Which?

### Choose Entity-based when:
- Building a simple CRUD application
- Small team or solo development
- Rapid prototyping
- Limited business complexity
- Team is new to backend development

### Choose Domain-based when:
- Complex business requirements
- Large team development
- Long-term maintainability is important
- Clear business domains exist
- Team understands DDD principles

---

## 🔧 Technologies Used

- **Backend**: Node.js, TypeScript, Express, Prisma
- **Frontend**: Nuxt.js, Vue 3, Tailwind CSS
- **Database**: SQLite (for development)
- **Auth**: JWT

---

## 📚 Further Reading

- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Clean Architecture by Robert Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 🤝 Contributing

Feel free to explore both approaches and compare how the same functionality is implemented differently in each architecture style.
