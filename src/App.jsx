import { useEffect, useState } from 'react';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";
import './components/Styles.css';

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
    <div className="app-container">
      <header>
        <h1>Fin Path</h1>
      </header>

      <main className="dashboard-grid">
        
        <section className="overview-section card">
          <Overview goals={goals} />
        </section>

        <section className="add-goal-section card">
          <GoalForm goals={goals} setGoals={setGoals} />
        </section>

        
        <section className="goals-list-section card">
          <GoalList goals={goals} setGoals={setGoals} />
        </section>

        <section className="deposit-form-section card">
          <DepositForm goals={goals} setGoals={setGoals} />
        </section>

        
        <section className="time-left-section card">
          <h2> Time Left on Goals</h2>
          <ul>
            {goals.map((goal) => {
              const today = new Date();
              const deadlineDate = new Date(goal.deadline);
              const timeDiff = deadlineDate - today;
              const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

              let statusText;
              if (daysLeft < 0 && deadlineDate < today) {
                statusText = " Overdue";
              } else if (daysLeft <= 30) {
                statusText = ` ${daysLeft} days left`;
              } else {
                statusText = `${daysLeft} days left`;
              }

              return (
                <li key={goal.id} className={daysLeft < 0 ? "overdue" : daysLeft <= 30 ? "warning" : ""}>
                  <strong>{goal.title}</strong>: {statusText}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
