import { component$, useStore, useWatch$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const baseRoute = "/calc";
  const state = useStore({
    name: "",
    time: 2,
    link: "",
    func: "multiple"
  });


  useWatch$(async ({ track }) => {
    track(() => state.time);

    state.link = `${baseRoute}?time=${state.time}&name=${state.name}`;
  });


  useWatch$(async ({ track }) => {
    track(() => state.name);
    state.link = `${baseRoute}?time=${state.time}&name=${state.name}`;
  });
  useWatch$(async ({ track }) => {
    track(() => state.func);
    state.link = `${baseRoute}?time=${state.time}&name=${state.name}&func=${state.func}`;
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
              <input type="text" className="form-control" placeholder="Naam" required onInput$={(ev) =>
                (state.name = (ev.target as HTMLInputElement).value)
              } />

              <label>Naam</label>
            </div>
            <div className="form-floating mb-3">
              <label>Tijd</label>
              <div className="input-group mb-3">
                <input type="number"
                       className="form-control"
                       placeholder="tijd"
                       required
                       value={state.time}
                       onInput$={(ev) => {
                         const input = (ev.target as HTMLInputElement);
                         state.time = input.valueAsNumber;
                       }
                       } />
                <span className="input-group-text" id="basic-addon2">minuten</span>
              </div>
            </div>
            <div style='display: none'>
              Bewerking?<br />

              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="multiple" id="multiple"
                       value="multiple"
                       checked={state.func === "multiple"}
                       onClick$={(ev) => {
                         state.func = 'multiple';
                       }
                       }/>
                <label className="form-check-label" for="multiple">Maaltafel</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="divide" id="divide"
                       value="divide" checked={state.func === "divide"}
                       onClick$={(ev) => {
                         state.func = 'divide';
                       }
                       }/>
                <label className="form-check-label" for="divide">Delen</label>
              </div>
            </div>
            <a href={`${baseRoute}?time=${state.time}&name=${state.name}&func=${state.func}`}
               className="w-100 btn btn-lg btn-primary"
               type="button">Starten maar</a>
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
