## ⚡ Tools Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Zod
- **Development**: tsx (TypeScript executor)
- **Linting**: Biome
- **Fake Data**: Faker.js
- **AI Assistance**: Cursor with Claude 3.5 Sonnet

## 🏗️ Architecture

- **Models**: MongoDB schemas and interfaces
- **Controllers**: Request handling and response formatting
- **Services**: Business logic and database operations
- **Routes**: API endpoint definitions
- **Config**: Environment and application configuration
- **Swagger**: API documentation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB (local or remote)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/pillar-labs-be
cd pillar-labs-be
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# .env
PORT=3333
MONGODB_URI=mongodb://root:example@localhost:27017
```

4. Run the development server:

```bash
pnpm dev
```

5. (Optional) Seed the database with sample data:

```bash
pnpm seed
```

6. Access the API documentation at [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

## 📡 API Endpoints

### Products

- `GET /api/products` - List all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `GET /api/products/search` - Search products by text

## 🎯 What's Next

- [ ] Add product deletion endpoint
- [ ] Implement pagination
- [ ] Add sorting options
- [ ] Implement filtering by category
- [ ] Add rate limiting
- [ ] Implement caching
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
