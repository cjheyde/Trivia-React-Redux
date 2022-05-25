export default async function getQuestionsFromAPI(token) {
  try {
    const item = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await item.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
