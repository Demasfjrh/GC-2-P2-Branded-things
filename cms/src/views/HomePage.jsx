import axios from "axios";
import { useEffect, useState } from "react"
import { baseUrl } from "../api/baseUrl";
    
export default function HomePage(){
    const [products, setProducts] = useState([])
    
    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/pub/branded-things/products`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            // console.log(data,'<<<<<');
            
            setProducts(data.data.query)
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(()=>{
      fetchProduct()
    },[])

    return(
        <>
            <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="product-section">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="display-2">Products</h1>
            <button className="btn btn-primary rounded-pill" id="new-product"><span className="icon material-symbols-outlined">add</span>New Product</button>
          </div>
          <div className="row">
            <div className="col-12 table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" width="180px">Image</th>
                    <th scope="col" width="250px">Description</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Author</th>
                    <th scope="col" width="50px"></th>
                  </tr>
                </thead>
                <tbody id="table-product">
                  <tr>
                    <td scope="row">#1</td>
                    <td className="fw-bold">MILLBERGET</td>
                    <td>
                      <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/201/1020142_PE831799_S4.jpg" className="img-fluid" />
                    </td>
                    <td>Swivel chair, murum black</td>
                    <td>13</td>
                    <td className="fw-bold">Rp1.599.000</td>
                    <td>admin@mail.com</td>
                    <td>
                      <span className="d-flex">
                        <a href="" className="ms-3"><span className="icon material-symbols-outlined text-danger">delete</span></a>
                        <a href="" className="ms-3"><span className="icon material-symbols-outlined text-danger">edit</span></a>
                        <a href="" className="ms-3"><span className="icon material-symbols-outlined text-danger">image</span></a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        </>
    )
}