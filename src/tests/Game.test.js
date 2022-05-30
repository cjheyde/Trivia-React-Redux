import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { questionsResponseApi } from '../tests/ourMocks/ourQuestions';
import { tokenResponseApi } from '../tests/ourMocks/ourToken';
import App from '../App';

// depois de tudo - limpa o mock
// afterEach(() => jest.clearAllMocks());
            // renderWithRouterAndRedux(<App />, initialState, { initialEntries: ['/trivia'] });
      // ou renderWithRouterAndRedux(<App />, initialState, "/feedback");

// o que preciso ter na tela do jogo?
// Verificar as informações do nome do jogador, score e foto estao na tela ok
// verificar se a API foi chamada para iniciar o jogo ok?
// Verificar se tem um card com a categoria do jogo ok?
// Verificar se tem um card com a pergunta do jogo ok?
// Verifica se tem a resposta correta ok?
// Verificar se tem a resposta errada ok? aqui vou precisar um array?
// Verificar se as alternativas estao na tela ok?

// verificar se um dos botoes ficam verde(resposta certa) e os outros vermelhos(respostas erradas)
// Verificar se tem um temporizador na tela
// Verificar se tem um botao de proximo habilitado
// verificar se a pontuacao muda ao acertar a resposta
// verificar se a pontuacao Nao muda ao acertar a resposta
// Verificar se ao clicar no botao de proximo, chega a proxima resposta
// Verificar se é feito o logout com o tempo expirado e se o token for invalido


describe('Cobertura de testes da tela de Jogo ', () => {
    global.fetch = jest.fn( async () => ({
        json: async () => (tokenResponseApi),
      }));

    const loginPageToTrivia = () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/Digite seu email/i);
    const name = screen.getByPlaceholderText(/Digite seu nome/i);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });
    
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
    userEvent.type(name, 'player1')
    userEvent.type(email, 'player1@player1.com')
    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
    
    const { pathname } = history.location; //verificar se preciso mudar de pagina
    expect(pathname).toBe('/trivia'); //verificar se realmente preciso dessa linha
    }
    // antes de qlq coisa - faz essa funcao
    beforeEach(loginPageToTrivia);

  it('Verifica se as informações do nome do jogador, score e foto estao na tela', () => {

    const nameEl = screen.getByTestId('header-player-name');
    const scoreEl = screen.getByTestId('header-score');
    const imgEl = screen.getByTestId('header-profile-picture');

    expect(nameEl).toBeInTheDocument();
    expect(scoreEl).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
      
  });
  it('Verificar se a API foi chamada para iniciar o jogo', ()=> {

    global.fetch = jest.fn( async () => ({
      json: async () => (questionsResponseApi),
    }));

    // renderWithRouterAndRedux(<App />);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${mockToken.token}`);
  });

  it('Verificar se tem um card com a categoria do jogo', () => {
    global.fetch = jest.fn( async () => ({
        json: async () => (questionsResponseApi),
      }));

    const categoryEl =  screen.getByTestId('question-category');

    expect(categoryEl).toBeInTheDocument()
    expect(categoryEl).toContainEqual(questionsResponseApi.results[0].category)
    expect(categoryEl).toEqual(questionsResponseApi.results[0].category)
  });

  it('Verificar se tem um card com a pergunta do jogo', () => {
    global.fetch = jest.fn( async () => ({
        json: async () => (questionsResponseApi),
    }));

    const questionEl =  screen.getByTestId('question-text');

    expect(questionEl).toBeInTheDocument()
    expect(questionEl).toContainEqual(questionsResponseApi.results[0].question)
    expect(questionEl).toEqual(questionsResponseApi.results[0].question)
  });

  it('Verificar se tem um texto com a resposta correta do jogo', () => {
    const correctEl =  screen.getByTestId('correct-answer');

    expect(correctEl).toBeInTheDocument()
    expect(correctEl).toContainEqual(questionsResponseApi.results[0].correct_answer)
    expect(correctEl).toEqual(questionsResponseApi.results[0].correct_answer)
  });

  it('Verificar se tem um texto com a resposta errada do jogo', () => {
    const wrongEl =  screen.getAllByTestId('wrong-answer');

    expect(wrongEl).toBeInTheDocument()
    expect(wrongEl).toContainEqual(questionsResponseApi.results[0].incorrect_answers)
    expect(wrongEl).toEqual(questionsResponseApi.results[0].incorrect_answers[0])
  });

  it('Verificar se tem botoes com as alternativas do jogo', () => {
    const answerEl =  screen.getAllByTestId('answer-options');
    
    expect(answerEl).toBeInTheDocument()
  });

});