export const myScore = (time) => {
  console.log(time);
  const difficultyValue = ['3', '2', '1'];
  const VALUE = 10;
  let scorePoints = 0;
  const difficulty = localStorage.getItem('difficulty');
  console.log(difficulty);
  if (difficulty === 'hard') {
    const playerScore = VALUE + (time * Number(difficultyValue[0]));
    scorePoints = playerScore;
  }
  if (difficulty === 'medium') {
    const playerScore = VALUE + (time * Number(difficultyValue[1]));
    scorePoints = playerScore;
  }
  if (difficulty === 'easy') {
    const playerScore = VALUE + (time * Number(difficultyValue[2]));
    scorePoints = playerScore;
  }
  console.log('oi', scorePoints);
  return scorePoints;
};

export const invalidCode = (history, savePlayerEmail, savePlayerName) => {
  localStorage.setItem('token', '');
  savePlayerEmail('');
  savePlayerName('');
  history.push('/');
};
