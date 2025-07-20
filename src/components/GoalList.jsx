import GoalItem from './GoalItem';

function GoalList({ goals, setGoals }) {
  return (
    <ul>
      {goals.map(goal => (
        <GoalItem key={goal.id} goal={goal} setGoals={setGoals} />
      ))}
    </ul>
  );
}

export default GoalList;
