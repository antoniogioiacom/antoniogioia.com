import { useState } from "react";

export default (props) => {
  const [state, setState] = useState({});

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  return (
    <form
      name="contact"
      method="post"
      action="/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="form"
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <label>
          Don’t fill this out:{" "}
          <input name="bot-field" onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span className="label">nome</span>
          <input type="text" name="name" onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span className="label">e-mail</span>
          <input type="email" name="email" onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span className="label">messaggio</span>
          <textarea name="message" rows="5" onChange={handleChange}></textarea>
        </label>
      </div>
      <div className="form-row">
        <button type="submit">invia messaggio</button>
      </div>
    </form>
  );
};
