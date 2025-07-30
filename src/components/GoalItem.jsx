import { useState } from 'react';

const API_URL = 'https://goal-planner-44hy.onrender.com/goals';

function GoalItem({ goal, setGoals }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: goal.title,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/${goal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editData,
          targetAmount: Number(editData.targetAmount)
        })
      });

      const updatedGoal = await res.json();

      setGoals(prevGoals =>
        prevGoals.map(g => (g.id === goal.id ? updatedGoal : g))
      );

      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/${goal.id}`, { method: 'DELETE' });
      setGoals(prevGoals => prevGoals.filter(g => g.id !== goal.id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <li style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
      {isEditing ? (
        <div>
          <input name="title" value={editData.title} onChange={handleEditChange} />
          <input name="targetAmount" type="number" value={editData.targetAmount} onChange={handleEditChange} />
          <input name="category" value={editData.category} onChange={handleEditChange} />
          <input name="deadline" type="date" value={editData.deadline} onChange={handleEditChange} />
          <button onClick={handleUpdate}> Save</button>
          <button onClick={() => setIsEditing(false)}> Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{goal.title}</h3>
          <p>
             Saved: Ksh {goal.currentAmount.toLocaleString()} / Ksh {goal.targetAmount.toLocaleString()} <br />
             Remaining: Ksh {remaining.toLocaleString()}
          </p>

          
          <div style={{
            background: "#eee",
            height: "10px",
            width: "100%",
            borderRadius: "5px",
            overflow: "hidden",
            marginBottom: "0.5rem"
          }}>
            <div style={{
              width: `${Math.min(progress, 100)}%`,
              height: "100%",
              background: progress >= 100 ? "green" : "#4caf50"
            }} />
          </div>

          <p> Category: {goal.category} |  Deadline: {goal.deadline}</p>

          <button onClick={() => setIsEditing(true)}> Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }}> Delete</button>
        </div>
      )}
    </li>
  );
}

export default GoalItem;
