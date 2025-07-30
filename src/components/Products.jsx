import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Download,
  DollarSign,
  Image,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editId, setEditId] = useState();
  const [showForm, setShowForm] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products || []);
      setTotalPages(result.data.total || 1);
    } catch (err) {
      console.log(err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError(null);
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Failed to delete product. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      setLoading(true);
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError(null);
      fetchProducts();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.log(err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      setLoading(true);
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  return (
    <div className="fade-in">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div>
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <Package size={28} />
            Product Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Manage your product catalog and inventory
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginBottom: '20px'
          }}>
            <Plus size={20} />
            {editId ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form ref={frmRef} onSubmit={editId ? handleUpdate : handleAdd}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div className="form-group">
                <label className="form-label">
                  <Package size={16} />
                  Product Name
                </label>
                <input
                  name="productName"
                  value={form.productName}
                  type="text"
                  className="form-input"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={16} />
                  Price
                </label>
                <input
                  name="price"
                  value={form.price}
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-input"
                  placeholder="Enter price"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">
                  <FileText size={16} />
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  className="form-input"
                  placeholder="Enter product description"
                  onChange={handleChange}
                  rows="3"
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">
                  <Image size={16} />
                  Image URL
                </label>
                <input
                  name="imgUrl"
                  value={form.imgUrl}
                  type="url"
                  className="form-input"
                  placeholder="Enter image URL"
                  onChange={handleChange}
                  required
                />
                {form.imgUrl && (
                  <div style={{ marginTop: '12px' }}>
                    <img 
                      src={form.imgUrl} 
                      alt="Preview"
                      style={{ 
                        width: '100px', 
                        height: '100px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid var(--border-color)'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {editId ? (
                <>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Product'}
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="search-container">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} 
            />
            <input
              type="text"
              className="search-input"
              placeholder="Search products by name or description..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{ paddingLeft: '44px' }}
            />
          </div>
          <button onClick={handleSearch} className="btn btn-primary">
            <Search size={16} />
            Search
          </button>
          <select 
            className="form-select"
            style={{ width: 'auto', minWidth: '120px' }}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'var(--text-secondary)'
          }}>
            <Package size={64} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or add a new product.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={product.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                            alt={product.productName}
                            style={{ 
                              width: '50px', 
                              height: '50px', 
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '2px solid var(--border-color)'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: '600' }}>
                              {product.productName}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: 'var(--text-secondary)' 
                            }}>
                              ID: {product._id?.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ 
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {product.description}
                        </div>
                      </td>
                      <td>
                        <div style={{ 
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#059669'
                        }}>
                          ${product.price}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-completed">
                          In Stock
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            title="View product"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => handleEdit(product)}
                            className="btn btn-secondary btn-sm"
                            title="Edit product"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-danger btn-sm"
                            title="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="btn btn-secondary"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              <div className="pagination-info">
                Page {page} of {totalPages} • {products.length} products
              </div>
              
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-secondary"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}