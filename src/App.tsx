import { useState } from 'react';
import './App.css';
import { DashBoard } from '@/components/dash-board';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DashBoard />
    </>
  );
}

export default App;
