import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Result } from "~/routes/calc/model";

export default component$((props: { results: Result[] }) => {

  const state = useStore({
    results: props.results,
    points: props.results.filter(r => r.right).length
  });

  return (
    <div class='px-4 py-5 my-5 text-center'>
      <div class='alert alert-success'>Tijd is over</div>

      <p>
        Punten: {state.points} / {state.results.length}
      </p>

      Wat vulde je in?
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
            <tr class={result.right? '': 'table-danger'}>
              <td>{result.val1} {result.func} {result.val2}</td>
              <td>{result.result}</td>
              <td>{result.expected}</td>
              <td >{result.right ? "V" : "X"}</td>
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
