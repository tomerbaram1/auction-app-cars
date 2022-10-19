import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Contact() {
  const [error, setError] = useState(null);
  const form = useRef();

  const data = {
    service_id: "service_jdd4txw",
    template_id: "template_1tq0cml",
    user_id: "XzWXG6th66GXzAash",
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_jdd4txw",
        "template_1tq0cml",
        form.current,
        "XzWXG6th66GXzAash"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email Sent", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        },
        (error) => {
          console.log(error.text);
          toast.error("could not send an email at this time. try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      );
  };

  // code fragment

  return (
    <div>
      <form className="form" ref={form} onSubmit={sendEmail}>
        <h3>CONTACT US</h3>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" className="bid-btn" />
      </form>
    </div>
  );
}
