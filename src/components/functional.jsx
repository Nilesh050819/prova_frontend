import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted or updated");
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Clicked {count}</button>;
}