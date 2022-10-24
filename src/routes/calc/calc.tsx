import { component$, useStore, useWatch$ } from "@builder.io/qwik";
import { Result } from "~/routes/calc/model";
import { useLocation } from "@builder.io/qwik-city";

interface State {
  val1: number;
  val2: number;
  prev: Result[];
  result: number | undefined;
  points: number;
  lastResultRight: boolean | null;
  done: boolean;
  func: "+" | "X" | ":" | "-";
}

export const Calc = component$((props: { submitResults$: (results: Result[]) => void }) => {
  const { func } = useLocation().query;

  const maxValue = 10;

  function generateNumber() {
    return Math.ceil(Math.random() * maxValue);
  }

  const state = useStore<State>({
    val1: generateNumber(),
    val2: generateNumber(),
    prev: [],
    result: undefined,
    points: 0,
    lastResultRight: null,
    done: false,
    func: func === "divide" ? ":" : "X"
  });


  useWatch$(async ({ track }) => {
    track(() => state.result);
    if (state.result) {
      const { result, val1, val2 } = state;
      const expected = func === "divide" ? val1 / val2 : val1 * val2;
      const right = result === expected;
      const lastResult: Result = {
        val1, val2,
        expected,
        result,
        right,
        func: state.func
      };
      state.prev = [...state.prev, lastResult];

      props.submitResults$(state.prev);

      state.points += right ? 1 : 0;
      state.lastResultRight = right;
      state.result = undefined;

      state.val1 = Math.ceil(Math.random() * maxValue);
      state.val2 = Math.ceil(Math.random() * maxValue);
    }
  });

  return (
    <div class="px-4 text-center">
      <div className="row row-cols-4">
        <div className="col">
          <div class="card">
            <div class="card-body">
              {state.val1}
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card">
            <div class="card-body">
              {state.func}
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card">
            <div class="card-body">
              {state.val2}
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card">
            <div class="card-body">
              =
            </div>
          </div>
        </div>
      </div>
      <div style="width: 40%; margin: auto;" class=" py-5">
        <input
          type="number"
          class="form-control form-control-lg"
          autoFocus
          value={state.result}
          onInput$={() => {
            state.lastResultRight = null;
          }}
          onKeyPress$={(ev) => {
            if (ev.keyCode === 13) {
              (state.result = (ev.target as HTMLInputElement).valueAsNumber);
            }
          }
          }
          onBlur$={(ev) =>
            (state.result = (ev.target as HTMLInputElement).valueAsNumber)
          } />

        <span class={state.lastResultRight === true ? "text text-success" : "text text-danger"}>
              {
                state.lastResultRight === null ? "" : state.lastResultRight ? "Juist" : "Volgende keer beter"
              }
         </span>
      </div>
      <div className="alert alert-secondary">{state.points} / {state.prev.length}</div>
    </div>


  );
});
