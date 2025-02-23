import { useNavigate } from 'react-router';

export default function Card({ product }) {
  const navigate = useNavigate();

  return (
    <>
      <div key={product.id}>
        <div className="group p-4 border border-purple-900 rounded-lg shadow-lg hover:shadow-purple-500 transition-all glow-border">
          <img
            src={product.imgUrl}
            alt="rog"
            className="w-50 h-50 rounded-lg cursor-pointer"
            onClick={() => navigate(`/detail/${product.id}`)}
          />

          <p className="text-center mt-2 text-purple-400 font-bold">
            <b>{product.name}</b>
          </p>

          <p className="text-center mt-2 text-purple-400">
            {product.description.length > 100
              ? product.description.substring(0, 100) + ' . . .'
              : product.description}
          </p>
          
        </div>
      </div>
    </>
  );
}
