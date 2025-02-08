export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Pillar Labs API',
    version: '1.0.0',
    description: 'API documentation for Pillar Labs',
  },
  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Development server',
    },
  ],
  paths: {
    '/api/products': {
      get: {
        operationId: 'getAllProducts',
        summary: 'Get all products',
        description: 'Retrieve a list of all products',
        responses: {
          '200': {
            description: 'List of products retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        operationId: 'createProduct',
        summary: 'Create a new product',
        description: 'Create a new product with the provided data',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '400': {
            description: 'Invalid input data',
          },
        },
      },
    },
    '/api/products/search': {
      get: {
        operationId: 'searchProducts',
        summary: 'Search products',
        description: 'Search products by text query',
        parameters: [
          {
            name: 'q',
            in: 'query',
            description: 'Search query text',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Search results',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/products/{id}': {
      put: {
        operationId: 'updateProduct',
        summary: 'Update a product',
        description: 'Update a product by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Product ID',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Product updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '404': {
            description: 'Product not found',
          },
          '400': {
            description: 'Invalid input data',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Product ID',
          },
          name: {
            type: 'string',
            description: 'Product name',
          },
          description: {
            type: 'string',
            description: 'Product description',
          },
          price: {
            type: 'number',
            description: 'Product price',
            minimum: 0,
          },
          quantity: {
            type: 'number',
            description: 'Product quantity',
            minimum: 0,
          },
          category: {
            type: 'string',
            description: 'Product category',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
          },
        },
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'quantity', 'category'],
        properties: {
          name: {
            type: 'string',
            description: 'Product name',
          },
          description: {
            type: 'string',
            description: 'Product description',
          },
          price: {
            type: 'number',
            description: 'Product price',
            minimum: 0,
          },
          quantity: {
            type: 'number',
            description: 'Product quantity',
            minimum: 0,
          },
          category: {
            type: 'string',
            description: 'Product category',
          },
        },
      },
    },
  },
}
