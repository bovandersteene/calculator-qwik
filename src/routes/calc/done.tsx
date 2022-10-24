import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Result } from "~/routes/calc/model";

export default component$((props: { results: Result[], restart$: () => void }) => {

  const state = useStore({
    results: props.results,
    points: props.results.filter(r => r.right).length
  });

  return (
    <div class=" text-center">
      <div>Tijd is over </div>

      <div  class="alert alert-success">
        Punten: {state.points} / {state.results.length}
      </div>
      <div  className="col-md-10 mx-auto col-lg-5 m-4">
        <button className="w-100 btn btn-lg btn-primary" onClick$={() => props.restart$()}>Begin opnieuw</button>
      </div>

      <h3>Resultaten</h3>
      <table class="table table-striped">
        <thead className="thead-dark">
        <th>Bewerking</th>
        <th>Resultaat</th>
        <th>Verwacht</th>
        <th>Juist</th>
        </thead>
        <tbody>
        {
          state.results.map(result =>
            <tr class={result.right ? "" : "table-danger"}>
              <td>{result.val1} {result.func} {result.val2}</td>
              <td>{result.result}</td>
              <td>{result.expected}</td>
              <td>{result.right ? "V" : "X"}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Tijd is over"
};
