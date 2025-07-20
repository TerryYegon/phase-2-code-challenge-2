import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  const completedGoals = goals.filter(
    (goal) => goal.currentAmount >= goal.targetAmount
  ).length;

  const today = new Date();

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft < 0 && deadlineDate < today) {
      return "⏰ Overdue";
    } else if (daysLeft <= 30) {
      return `⚠️ ${daysLeft} days left`;
    } else {
      return `${daysLeft} days left`;
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>📊 Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: Ksh {totalSaved.toLocaleString()}</p>
      <p>Completed Goals: {completedGoals}</p>

      <h3> Time Left per Goal</h3>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.title}</strong>: {formatDeadline(goal.deadline)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Overview;
