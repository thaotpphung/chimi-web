import { useState } from 'react';
import './App.css';
import { MealPlan } from '@/components/meal-plan';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MealPlan />
    </>
  );
}

export default App;
