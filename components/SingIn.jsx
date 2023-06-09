"use client";
import firebase_App from "@/utils/firebase.init";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

const SingIn = () => {
  // email and password state
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();

  // firebase auth
  const auth = getAuth(firebase_App);

  // handel submit form
  const handelOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    //firebase email pass provider for singin

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        form.reset();
        modal.showModal();
        console.log(user);
        setEmail("");
      })
      .catch((error) => console.log(error));
  };

  // handel forgot password
  const handelForgotPassword = () => {
    if (!email) {
      modal_missing_email.showModal();
      return;
    }
    console.log("click");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        modal_reset_email.showModal();
      })
      .catch((error) => console.log(error));
  };

  // handel email on Blur
  const handelEmailOnBlur = (e) => {
    const userProvideEmail = e.target.value;
    setEmail(userProvideEmail);
    console.log(userProvideEmail);
  };

  // handel password on change
  const handelPasswordOnChange = (e) => {
    const userProvidePassword = e.target.value;
    setpassword(userProvidePassword);
    console.log(userProvidePassword);
  };

  return (
    <>
      <div className="hero h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left px-20">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form action="" onSubmit={() => handelOnSubmit(event)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    onBlur={() => handelEmailOnBlur(event)}
                    type="email"
                    name="email"
                    placeholder="email"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    onChange={() => handelPasswordOnChange(event)}
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                    className="input input-bordered"
                  />
                  <label className="label">
                    <p
                      onClick={() => handelForgotPassword()}
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </p>
                    <Link
                      href="/register"
                      className="label-text-alt link link-hover"
                    >
                      Are you in new ? SingUp Now
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {}}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* modal for login success*/}
      <dialog id="modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Happy!</h3>
          <p className="py-4">
            Login Successfuly to{" "}
            <a className=" underline" href="https://mail.google.com/">
              {email}{" "}
            </a>{" "}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* modal for reset email sent*/}
      <dialog id="modal_reset_email" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Confirm Email</h3>
          <p className="py-4">
            Please cheack your{" "}
            <a className=" underline" href="https://mail.google.com/">
              {email}{" "}
            </a>{" "}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* modal for invalid email*/}
      <dialog id="modal_missing_email" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Check</h3>
          <p className="py-4 text-red-600">
            Please Enter your email{" "}
            <a className=" underline" href="https://mail.google.com/">
              {email}{" "}
            </a>{" "}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default SingIn;
