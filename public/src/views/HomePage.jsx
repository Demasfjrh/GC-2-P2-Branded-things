import { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import gifLoading from '../assets/220.svg';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("asc");
  let button = [];

  for (let x = 1; x <= totalPage; x++) {
    button.push(x);
  }

  async function fetchProducts() {
    try {
      setLoading(true);

      // console.log(search,'<<<<<>>>>');

      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products?q=${search}&i=${filter}&limit=12&page=${currentPage}&sort=${sort}`
      );

      // console.log(data, '><><><//');

      // console.log(search, '<<<');
      setTotalPage(data.data.pagination.totalPage);
      setProducts(data.data.query);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCat() {
    try {
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/categories`
      );
      // console.log(data,'<<<');

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchProducts();
  }

  function handleSortChange(event) {
    setSort(event.target.value);
  }

  useEffect(() => {
    fetchCat();
    fetchProducts();
  }, [search, filter, currentPage, sort]);

  // useEffect(() => {
  //   console.log(filter);
  // });

  return (
    <>
    {/* {search} */}
      <div className="mt-20">
        <form onSubmit={handleSearch}>
          <div className="flex justify-center">
            <div>
              <input
                className="peer h-full w-100 outline-none text-sm text-white-800 pr-2 text-left py-3 px-10 bg-purple-800 rounded-3xl"
                type="text"
                id="search"
                placeholder="Search something ..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </form>

    {/* {filter} */}
        <div className="flex justify-center m-10">
          <select
            onChange={(e) => setFilter(e.target.value)}
            defaultValue={''}
            className="px-4 py-2 m-5 text-white bg-purple-700 rounded-lg hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-500 transition-all">
            <option value={''}>All</option>
            {categories.map((cat) => {
              return <option key={cat.id}>{cat.name}</option>;
            })}
          </select>
          <select className="px-4 py-2 m-5 text-white bg-purple-700 rounded-lg hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-500 transition-all"
          value={sort}
          onChange={handleSortChange}>
            <option value="asc">Sort Start</option>
            <option value="desc">Sort End</option>
          </select>
        </div>

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
          <main className="container mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-10">
            {products.map((product) => {
              return (
                <Card
                  key={product.id}
                  product={product}
                />
              );
            })}
          </main>
        )}

        {/* {pagination} */}

        <div className="flex justify-center m-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-600 text-white rounded disabled:bg-gray-400">
            Previous
          </button>

          <span className="px-4 py-2 text-white bg-purple-800 rounded">{`Page ${currentPage} of ${totalPage}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPage))
            }
            disabled={currentPage === totalPage}
            className="px-4 py-2 mx-2 bg-gray-600 text-white rounded disabled:bg-gray-400">
            Next
          </button>
        </div>

        <div className="flex justify-center m-10 pb-10">
          {button.map((btn) => {
            return (
              <button
                key={btn}
                onClick={() => setCurrentPage(btn)}
                disabled={currentPage === btn}
                className="px-4 py-2 mx-2 bg-gray-600 text-white rounded disabled:bg-gray-400">
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
