const myScore = () => {
  const difficultyValue = ['3', '2', '1'];
  const timer = 30;
  const VALUE = 10;
  let scorePoints = 0;
  const difficulty = localStorage.getItem('difficulty');
  if (difficulty === 'hard') {
    const playerScore = VALUE + (timer * Number(difficultyValue[0]));
    scorePoints = playerScore;
  }
  if (difficulty === 'medium') {
    const playerScore = VALUE + (timer * Number(difficultyValue[1]));
    scorePoints = playerScore;
  }
  if (difficulty === 'easy') {
    const playerScore = VALUE + (timer * Number(difficultyValue[2]));
    scorePoints = playerScore;
  }
  return scorePoints;
};

export default myScore;
