import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section class="container my-5">
          <Slot />
        </section>
      </main>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="https://www.firepeak.tech/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              <svg className="bi" width="30" height="24">
                Made with ♡ by Bo Vandersteene
              </svg>
            </a>
            <span className="mb-3 mb-md-0 text-muted">
            <a href="https://www.firepeak.tech/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
              Made with ♡ by Bo Vandersteene
            </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
});
