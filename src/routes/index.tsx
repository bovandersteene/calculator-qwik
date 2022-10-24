import { component$, useStore, useWatch$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const baseRoute = '/calc'
  const state = useStore({
    name: '',
    time: 2,
    link: ''
  });


  useWatch$(async ({ track }) => {
    track(() => state.time);

    state.link = `${baseRoute}?time=${state.time}&name=${state.name}`;
  });


  useWatch$(async ({ track }) => {
    track(() => state.name);
    state.link = `${baseRoute}?time=${state.time}&name=${state.name}`;
  });

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 shadow-lg rounded-3">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <p className="col-lg-10 fs-4">Klaar om te rekenen ??</p>
          Leren hoofdrekenen tegen tijd
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-light">
            <div className="form-floating mb-3">
              <input type="text" className="form-control"  placeholder="Naam" onInput$={(ev) =>
                (state.name = (ev.target as HTMLInputElement).value)
              }/>
              <label >Naam</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control"  placeholder="tijd"
                     value={state.time} onInput$={(ev) =>
                (state.time = (ev.target as HTMLInputElement).valueAsNumber)
              }/>
              <label >Tijd</label>
            </div>
            <a href={state.link} className="w-100 btn btn-lg btn-primary" type="button">Starten maar</a>
            <hr className="my-4" />
            <small className="text-muted">Er worden geen gegevens opgeslagen, de gegevens zijn enkel om je in het spel
              te begeleiden</small>
          </form>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Firepeak - rekentool voor lagere school"
};
