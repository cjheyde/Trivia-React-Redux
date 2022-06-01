import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { questionsResponseApi } from '../tests/helpers/ourMocks/ourQuestions';
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

  it('Verificar se a API do Jogo foi chamada', async () => {
    localStorage.setItem('token', 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6')
    renderWithRouterAndRedux(<App />, initialState, '/game')

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://opentdb.com/api.php?amount=5&token=${tokenResponseApi.token}`);
  });

  it('Verificar se tem um card com a dificuldade, categoria e questoes do jogo', async () => {
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

  it('Verificar se tem botoes com as alternativas do jogo', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    const answerEl =  await screen.findAllByTestId('answer-options');
    const answersEl1 = await screen.findAllByRole('button')

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))

    expect(answerEl[0]).toBeInTheDocument();
    expect(answersEl1[0]).toBeInTheDocument();
  });

  it('Verificar se o temporizador está na tela ', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))

    const timerEl = await screen.findByText(/tempo/i)
    expect(timerEl).toBeInTheDocument('Tempo');
  });

it('Verificar se o temporizador é igual a zero e desabilita dos botoes ', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game')

    jest.useFakeTimers();

    await waitForElementToBeRemoved( () => screen.getByText('Loading'))

    const setEl = setTimeout(() => {
      expect(clearInterval).toHaveBeenCalled();
    }, 1000)

    jest.runAllTimers();
    clearInterval(setEl)
    const answersEl1 = await screen.findByRole('button',
      { name: questionsResponseApi.results[0].correct_answer } )
      
    const answersEl2 = await screen.findByRole('button',
      { name: questionsResponseApi.results[0].incorrect_answers[0] } ) 

      expect(answersEl1).toBeDisabled()
      expect(answersEl2).toBeDisabled()
    
  });

/*    it('Verificar se ao clicar, para o temporizador e é salvo do StoreGlobal ', async () => {
     renderWithRouterAndRedux(<App />, initialState, '/game')

     

     // jest.useFakeTimers();
     
     // const timerEl = await screen.findByText(/tempo/i)
     // const spy  = jest.spyOn(global, 'clearInterval')

    

  });  */


});