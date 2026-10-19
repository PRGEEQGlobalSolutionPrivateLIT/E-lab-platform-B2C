import {
  runReactFramework,
} from './framework/react-runner.mjs';

const code = `
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>

      <button
        type="button"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}
`;

const result =
  await runReactFramework({
    problemSlug:
      'react-counter',

    files: [
      {
        path:
          'App.jsx',

        language:
          'javascript',

        content:
          code,
      },
    ],
  });

console.log(
  JSON.stringify(
    result,
    null,
    2,
  ),
);
