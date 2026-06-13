const API_BASE = 'https://api.escuelajs.co/api/v1';

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message?.[0]?.message || err.message || `API Error: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function mapProductFromApi(apiProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.price,
    description: apiProduct.description,
    category: apiProduct.category?.name || 'Uncategorized',
    categoryId: apiProduct.category?.id || null,
    image: apiProduct.images?.[0] || 'https://picsum.photos/400',
    images: apiProduct.images || [],
    stock: 10,
    tag: null,
  };
}

export function mapProductToApi(localProduct) {
  return {
    title: localProduct.name,
    price: Number(localProduct.price),
    description: localProduct.description || '',
    categoryId: localProduct.categoryId || 1,
    images: localProduct.image ? [localProduct.image] : ['https://picsum.photos/400'],
  };
}

export async function fetchProducts() {
  const data = await request('/products?limit=200');
  return (data || []).map(mapProductFromApi);
}

export async function fetchProduct(id) {
  const data = await request(`/products/${id}`);
  return mapProductFromApi(data);
}

export async function createProduct(productData) {
  const data = await request('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
  return mapProductFromApi(data);
}

export async function updateProduct(id, productData) {
  const data = await request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
  return mapProductFromApi(data);
}

export async function deleteProductFromApi(id) {
  await request(`/products/${id}`, { method: 'DELETE' });
  return true;
}

export async function fetchCategories() {
  const data = await request('/categories?limit=200');
  return (data || []).map(cat => ({ id: cat.id, name: cat.name, image: cat.image }));
}

export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  accessToken = data.access_token;
  try {
    const payload = JSON.parse(atob(data.access_token.split('.')[1]));
    return { ...payload, access_token: data.access_token, refresh_token: data.refresh_token };
  } catch {
    return { access_token: data.access_token, refresh_token: data.refresh_token, role: 'customer' };
  }
}

export async function fetchUsers() {
  return request('/users?limit=200');
}

export async function registerUser(userData) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}
