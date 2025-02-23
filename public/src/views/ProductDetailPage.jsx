import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import gifLoading from '../assets/220.svg';
import axios from 'axios';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products/${id}`
      );

      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center mt-100">
            <img
              src={gifLoading}
              className="w-50"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-center bg-purple-900 border-2 border-black p-5 m-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] h-auto w-full">
          <div>
            <img
              src={product?.imgUrl}
              alt="product image"
              className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full"
            />
          </div>
          <div className="flex mx-10 flex-col w-1/2 justify-between">
            <b className="text-4xl mb-5">{product?.name}</b>
            <p className="h-full">Rp. {product?.price?.toLocaleString('id-ID')}</p>
            <p className="h-full">{product?.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
