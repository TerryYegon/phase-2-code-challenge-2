import { useEffect, useState } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import DepositForm from "./components/DepositForm";

const API_URL = 'http://localhost:3000/goals';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    setGoals(data);
  } catch (error) {
    console.error("Error fetching goals:", error);
  }
};

  return (
    <div style={{ padding: "2rem" }}>
      <h1> My Savings Goals</h1>
      <GoalForm setGoals={setGoals} goals={goals} />
      <GoalList goals={goals} setGoals={setGoals} />
      <DepositForm goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;
