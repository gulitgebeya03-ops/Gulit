// src/data/Products.js

export const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Sports", "Books"];

export const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "In Stock"];

export function formatPrice(n) {
  return "ETB " + n.toLocaleString();
}