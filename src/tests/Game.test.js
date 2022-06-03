import React from 'react';
import { findByRole, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { questionsResponseApi, invalidTokenQuestionsResponseApi } from '../tests/helpers/ourMocks/ourQuestions';
import { tokenResponseApi } from '../tests/helpers/ourMocks/ourToken';
import App from '../App';

const initialState = {
  player: {
    name:"Elaine",
    assertions:0,
    score:0,
    gravatarEmail:"elaine@hotmail.com",
  }
}
// desse jeitos fica em todos os test - contaminando tudo - o ideal é usar o spyOn
// mentoria Pessini
    /* global.fetch = jest.fn(async () => ({  
        json: async () => (questionsResponseApi)
      })); */

describe('Cobertura de testes da tela do Game ', () => {
      
  // afterEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());
  beforeEach(() => jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(questionsResponseApi),
  }));
  
  it('Verifica se as informações do nome do jogador, score e foto estao na tela do Game', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    const nameEl = screen.getByTestId('header-player-name');
    const scoreEl = screen.getByTestId('header-score');
    const imgEl = screen.getByTestId('header-profile-picture');

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))

    expect(nameEl).toBeInTheDocument();
    expect(scoreEl).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
  });

  it('Verificar se a API do Jogo foi chamada com o token Correto', async () => {
    localStorage.setItem('token', 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6')
    renderWithRouterAndRedux(<App />, initialState, '/game')

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://opentdb.com/api.php?amount=5&token=${tokenResponseApi.token}`);
  });

  it('Verificar se é retornado ao login se não houver token ou se o token for incorreto', async () => {
    global.localStorage.clear();
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponseApi),
    });

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitForElementToBeRemoved( () => screen.getByText('Loading'));

    expect(global.fetch).toHaveBeenCalled();
    const buttonEntrarEl = await screen.findByRole('button', { name: /Play/i });

    expect(buttonEntrarEl).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });


  it('Verificar se tem um card boolean com a dificuldade, categoria e questoes do jogo', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))
    
    const difficultyEl = await screen.findByRole('heading',
      { name: `Difficulty: ${questionsResponseApi.results[0].difficulty}` })
    const categoryEl = await screen.findByRole('heading',
      {name: `Category: ${questionsResponseApi.results[0].category}` })
    const questionsEl = await screen.findByRole('heading',
      { name: `${questionsResponseApi.results[0].question }` })

    expect(difficultyEl).toBeInTheDocument()
    expect(categoryEl).toBeInTheDocument()
    expect(questionsEl).toBeInTheDocument()

  });

  it('Verificar se tem botoes com as alternativas do jogo boolean', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')
    await waitForElementToBeRemoved( () => screen.queryByText('Loading'))

    const answerEl =  await screen.findAllByTestId('answer-options');
    const answersEl1 = await screen.findAllByRole('button')


    expect(answerEl[0]).toBeInTheDocument();
    expect(answersEl1[0]).toBeInTheDocument();

  });

  it('Verificar se ao cliclar em todos botoes com as alternativas do jogo é redirecionado ao Feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')

    const answersEl1 = await screen.findByTestId('correct-answer');
    expect(answersEl1).toBeInTheDocument();
    userEvent.click(answersEl1)
    const nextButtonEl1 = await screen.findByRole('button', { name: /next/i })
    expect(nextButtonEl1).toBeInTheDocument();
    userEvent.click(nextButtonEl1);

    const answersEl2 = await screen.findByTestId('correct-answer');
    expect(answersEl2).toBeInTheDocument();
    userEvent.click(answersEl2)
    const nextButtonE2 = await screen.findByRole('button', { name: /next/i })
    expect(nextButtonE2).toBeInTheDocument();
    userEvent.click(nextButtonE2);

    const answersEl3 = await screen.findByTestId('correct-answer');
    expect(answersEl3).toBeInTheDocument();
    userEvent.click(answersEl3)
    const nextButtonEl3 = await screen.findByRole('button', { name: /next/i })
    expect(nextButtonEl3).toBeInTheDocument();
    userEvent.click(nextButtonEl3);

    const answersEl4 = await screen.findByTestId('correct-answer');
    expect(answersEl4).toBeInTheDocument();
    userEvent.click(answersEl4)
    const nextButtonEl4 = await screen.findByRole('button', { name: /next/i })
    expect(nextButtonEl4).toBeInTheDocument();
    userEvent.click(nextButtonEl4);

    const answersEl5 = await screen.findByTestId('correct-answer');
    expect(answersEl5).toBeInTheDocument();
    userEvent.click(answersEl5)
    const nextButtonEl5 = await screen.findByRole('button', { name: /next/i })
    expect(nextButtonEl5).toBeInTheDocument();
    userEvent.click(nextButtonEl5);

    expect(history.location.pathname).toBe('/feedback')

  });

  it('Verificar se o temporizador está na tela ', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    await waitForElementToBeRemoved( () => screen.queryByText('Loading'))

    const timerEl = await screen.findByText(/time/i)
    expect(timerEl).toBeInTheDocument('Time');
  });

it('Verificar se o temporizador é igual a zero e desabilita dos botoes ', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')
    // mockar o tempo
    jest.useFakeTimers();

    await waitForElementToBeRemoved( () => screen.queryByText('Loading'))
    
    //jest.runAllTimers();
    jest.advanceTimersByTime(32000)
    expect(clearInterval).toHaveBeenCalled()
    const buttonCorrectEl = await screen.findByTestId('correct-answer');
    const buttonErrorEl = await screen.findAllByTestId('wrong-answer');
    
    expect(buttonCorrectEl).toBeDisabled()
    expect(buttonErrorEl[0]).toBeDisabled()
    
    // voltar ao estado normal dos timers
    jest.useRealTimers();
  });
  it('Verificar se a resposta correta é respondida e se soma os pontos e para o contator', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    await waitForElementToBeRemoved( () => screen.queryByText('Loading'))

    const answersEl1 = await screen.findByTestId('correct-answer');
    expect(answersEl1).toHaveClass('answer');
    expect(answersEl1).toBeInTheDocument();
    userEvent.click(answersEl1);
    expect(answersEl1).toBeDisabled();
    
    const timerEl = await screen.findByText(/time/i)
    expect(timerEl).toBeInTheDocument('Time');
    expect(timerEl).toHaveTextContent('Time: 30');
    
    const scoreEl = await screen.findByTestId('header-score');
    expect(scoreEl).toHaveTextContent(40);
    
    expect(answersEl1).toHaveClass('correctAnswer');
  });
  it('Verificar se ao cliclar em cada botao correto, irá redirecionar para Feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game')

    const answersEl1 = await screen.findAllByRole('button', {name: 'correct-answer' });
    console.log(answersEl1);

    // await waitForElementToBeRemoved( () => screen.queryByText('Loading'))

    answersEl1.forEach((eachQuestion, index) => {
      userEvent.click(answersEl1)
      expect(screen.queryByText(eachQuestion[index])).toBeInTheDocument();
      expect(history.location.pathname).toBe('/feedback')
    });


  });
});