# Kishansetu API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication

### POST /api/auth/signup
Create a new account.

**Body (JSON):**
```json
{
  "fullName": "string (required)",
  "phone": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 8 chars)",
  "role": "string (optional, 'buyer' or 'seller', default: 'buyer')"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully!",
  "user": { "id": "...", "fullName": "...", "email": "...", "role": "..." }
}
```

### POST /api/auth/login
Login and receive a JWT token.

**Body (JSON):**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "message": "Login successful!",
  "token": "jwt...",
  "user": { "id": "...", "fullName": "...", "email": "...", "role": "..." }
}
```

---

## Seller (Farmer) Endpoints

All require `Authorization: Bearer <token>` header. Role must be `seller`.

### GET /api/seller/profile
Get the seller's profile.

### PUT /api/seller/profile
Update profile.

**Body (JSON):**
```json
{ "fullName": "string", "phone": "string", "description": "string" }
```

### GET /api/seller/location
Get location details.

### PUT /api/seller/location
Update location.

**Body (JSON):**
```json
{ "village": "string", "city": "string", "state": "string" }
```

### GET /api/seller/products
Get all products listed by the seller.

### POST /api/seller/products
Add a new product (multipart form).

**Fields:**
- `name` (text)
- `category` (text: Vegetables, Fruits, Grains, Dairy, Spices, Organic)
- `price` (number)
- `quantity` (text, e.g. "50 kg")
- `image` (file: jpg/png/jpeg)

### PUT /api/seller/products/:id
Update a product (multipart form). Same fields as create.

### DELETE /api/seller/products/:id
Delete a product.

### GET /api/seller/stats
Get dashboard stats (total products, profile views, location, phone).

---

## Buyer Endpoints

All require `Authorization: Bearer <token>` header. Role must be `buyer`.

### GET /api/buyer/profile
Get the buyer's profile.

### PUT /api/buyer/profile
Update profile.

**Body (JSON):**
```json
{ "fullName": "string", "phone": "string" }
```

### GET /api/buyer/sellers
Get a list of all sellers with their first 4 products.

### GET /api/buyer/sellers/:id
Get a specific seller's full profile and all products.

---

## General

### GET /
Health check — returns `{ "message": "Kishansetu backend is running", "status": "ok" }`

### GET /api/health
API health check — returns `{ "message": "API healthy", "status": "ok" }`
