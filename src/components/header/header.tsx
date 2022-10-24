import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src="/logo.svg" height="75px" />
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" className="nav-link px-2 text-secondary">Sneller leren hoofdrekenen</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
});
