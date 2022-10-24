import {
  component$,
  useClientEffect$,
  useStore,
  useWatch$,
} from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import Done from './done';
import { Calc } from './calc';
import { Result } from "~/routes/calc/model";

interface State {
  time: number;
  done: boolean;
  results:Result []
}

export default component$(() => {
  const { name, time } = useLocation().query;

  const state = useStore<State>({
    time: (+time) * 60 / 6,
    done: false,
    results: []
  });

  useClientEffect$(({ cleanup }) => {
    const internal = setInterval(() => state.time--, 1000);
    cleanup(() => clearInterval(internal));
  });

  useWatch$(async ({ track }) => {
    track(() => state.time);
    if (state.time <= 0) {
      state.done = true;
    }
  });

  return (
    <>
      <h1>Hi {name}!</h1>

      {state.done ? <Done results={state.results}/> : <div class='alert alert-primary'>Nog {state.time} seconden over</div>}
      {state.done ? '' : <Calc submitResults$={results => state.results = results}/>}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Flower',
};
