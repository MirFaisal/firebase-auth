"use client";
import firebase_App from "@/utils/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  // email and password state
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [userName, setUserName] = useState();

  // firebase auth
  const auth = getAuth(firebase_App);

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    //firebase email pass provider for create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //show modal
        sendModal("Cheack", "Send Email Verification");
        //   resating form
        form.reset();
        //sent verification email
        EmailVerification();
        //update profile
        updateUserProfile();
        console.log(user);
      })
      .catch((error) => {
        const errorMsg = error.message;
        if (errorMsg === "Firebase: Error (auth/wrong-password).") {
          setErrorMessage(
            "The password is invalid or the user does not have a password."
          );
        }
        console.log(errorMessage);
        console.log(errorMsg);
      });
  };
  // send email verification
  const EmailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  // updating user profilee
  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //user name on blur
  const handelNameOnBlur = (e) => {
    const userProvideName = e.target.value;
    setUserName(userProvideName);
    console.log(userProvideName);
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

  // logic for modal
  const sendModal = (header, message) => {
    const modalHeader = document.getElementById("modal_heading");
    modalHeader.innerText = header;
    const modalMessage = document.getElementById("modal_message");
    modalMessage.innerText = message;

    main_modal.showModal();
  };

  return (
    <>
      {/* login form */}
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
                    <span className="label-text">User name</span>
                  </label>
                  <input
                    onBlur={() => handelNameOnBlur(event)}
                    type="text"
                    name="name"
                    placeholder="user name"
                    required
                    className="input input-bordered"
                  />
                </div>
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
                    <Link href="/" className="label-text-alt link link-hover">
                      Already have an acount !
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

      {/* modal */}

      <dialog id="main_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 id="modal_heading" className="font-bold text-lg"></h3>
          <div className="flex py-4">
            <p id="modal_message"></p>

            <span>
              <a className=" underline ms-1" href="https://mail.google.com/">
                {email}{" "}
              </a>{" "}
            </span>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* modal for any error*/}
      <dialog id="modal_error" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Faild !</h3>
          <p className="py-4 text-red-600">{errorMessage} </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Register;
