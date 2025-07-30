import { useState } from 'react';

const API_URL = 'https://goal-planner-44hy.onrender.com/goals';

function GoalForm({ goals, setGoals }) {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");

    const newGoal = {
      ...formData,
      currentAmount: 0,
      targetAmount: Number(formData.targetAmount)
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });

      const savedGoal = await res.json();
      setGoals([...goals, savedGoal]);

      
      setFormData({ title: '', targetAmount: '', category: '', deadline: '' });
    } catch (err) {
      console.error("Failed to create goal:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        name="title"
        placeholder="Goal Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="targetAmount"
        placeholder="Target Amount (in Ksh)"
        type="number"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value=""> Select Category </option>
        <option value="Travel">Travel</option>
        <option value="Emergency Fund">Emergency Fund</option>
        <option value="Education">Education</option>
        <option value="Business">Business</option>
        <option value="Gadgets">Gadgets</option>
        <option value="Other">Other</option>
      </select>

      <input
        placeholder="Deadline"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
      />

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
