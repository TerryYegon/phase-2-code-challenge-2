import { useState } from "react";

const API_URL = "https://goal-planner-44hy.onrender.com/goals";

function DepositForm({ goals, setGoals }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("GOALS ARRAY:", goals);
  console.log("SELECTED GOAL ID:", selectedGoalId);

  const goal = goals.find((g) => String(g.id) === String(selectedGoalId));

  if (!goal) {
    alert("Goal not found.");
    return;
  }

  const updatedAmount = goal.currentAmount + Number(depositAmount);

  try {
    const res = await fetch(`${API_URL}/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentAmount: updatedAmount }),
    });

    const updatedGoal = await res.json();

    const updatedGoals = goals.map((g) =>
      g.id === updatedGoal.id ? updatedGoal : g
    );

    setGoals(updatedGoals);
    setDepositAmount("");
    setSelectedGoalId("");
  } catch (err) {
    console.error("Deposit failed:", err);
  }
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Make a Deposit</h3>
      <label>
        Select Goal:
        <select
  value={selectedGoalId}
  onChange={(e) => setSelectedGoalId(e.target.value)}  
  required
>
  <option value=""> Choose </option>
  {goals.map((goal) => (
    <option key={goal.id} value={goal.id}>
      {goal.title}
    </option>
  ))}
</select>

      </label>
      <br />

      <label>
        Deposit Amount (Ksh):
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Add Deposit</button>
    </form>
  );
}

export default DepositForm;
