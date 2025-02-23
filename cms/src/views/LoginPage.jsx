import { useEffect, useState } from "react";
import {baseUrl} from "../api/baseUrl";
import { useNavigate } from "react-router";
import axios from 'axios'
import Toastify from 'toastify-js'


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.access_token) {
            Toastify({
                text: "You already logged in",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
            navigate('/')
        }
    }, [navigate])

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const { data } = await axios.post(`${baseUrl}/apis/login`, { email, password })

            console.log(data,"<<<");
            
        localStorage.setItem('access_token', data.data.access_token)

        navigate('/')

        Toastify({
            text: "Succeed Login",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#34D399",
                color: "black",
                border: "solid #000000",
                borderRadius: "8px",
                boxShadow: "2px 2px black"
            },
        }).showToast();

        } catch (error) {
            Toastify({
                text: error.response.data.error,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
            
        }
    }

useEffect(()=>{handleLogin()})

  return (
    <>
      <section
        className="container"
        id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>
              Log in and autocomplete your order with your personal data, or
              sign up to enjoy all the benefits of an IDEA account.
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img
                  src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/561/1056141_PE848273_S4.webp"
                  width="350px"
                  alt="sofa"
                />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form" onSubmit={handleLogin}>
                    <h1 className="h3 mb-3 display-1">Log in to your account</h1>
                    <span>
                      Log in on your profile to autocomplete your purchase order
                      with your personal data.
                    </span>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="current-email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="checkbox mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="login-remember"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="login-remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit">
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
