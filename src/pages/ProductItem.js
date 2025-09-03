import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function ProductItem({ product, currentUser }) {
  const navigate = useNavigate();

  // Delete handler
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', product.id));
      alert('Product deleted!');
      // Refresh product list or notify parent to refresh
    }
  };

  // Edit handler
  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      {currentUser.uid === product.farmerId && (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      {/* Chat button for buyers */}
      {currentUser.uid !== product.farmerId && (
        <button onClick={() => navigate(`/chat/${product.farmerId}`)}>Chat with Farmer</button>
      )}
    </div>
  );
}
