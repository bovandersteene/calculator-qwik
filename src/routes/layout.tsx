import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section class="container my-5">
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.firepeak.tech/" target="_blank">
          Made with ♡ by Bo Vandersteene
        </a>
      </footer>
    </>
  );
});
