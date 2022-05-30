import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  savePlayerNameAct,
  savePlayerEmailAct,
  saveTokenAction,
} from '../redux/actions/index';
// import logo from '../trivia.png';
// import '../App.css';
// codado em pair programing All - Carla Heyde/Nata Abrahão/Paulo Bruno/Priscila Nogueira/Elaine Costa

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      loginButtonDisabled: true,
      fetching: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validateButton();
    });
  }

  validateButton = () => {
    const { email, name } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const enable = false;
    const disable = true;
    // se for tudo true = valida o botao
    // esse .test foi feito na aula do Yuri - nosso colega - repositorio: https://github.com/yuri-rc/trybe-login/blob/main/src/App.js
    this.setState({
      loginButtonDisabled: regexEmail.test(email)
        && name.length > 0 ? enable : disable,
    });
  }

  getToken = async () => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const result = await response.json();
    return result.token;
  }

  onSubmit = async () => {
    const { savePlayerName, savePlayerEmail, saveToken, history } = this.props;
    const { name, email } = this.state;
    this.setState({
      fetching: true,
    }, async () => {
      const token = await this.getToken();
      localStorage.setItem('token', token);
      savePlayerName(name);
      savePlayerEmail(email);
      saveToken(token);
      this.setState({
        fetching: false,
      }, () => history.push('/game'));
    });
  }

  render() {
    const { email, name, loginButtonDisabled, fetching } = this.state;
    return (
      fetching ? <h1>Loading</h1>
        : (
          <div className="App">
            <form className="login">
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  value={ email }
                  name="email"
                  id="email"
                  placeholder="Digite seu email"
                  onChange={ this.handleChange }
                  data-testid="input-gravatar-email"
                />
              </label>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  id="name"
                  value={ name }
                  name="name"
                  placeholder="Digite seu nome"
                  onChange={ this.handleChange }
                  data-testid="input-player-name"
                />
              </label>
              {/* <Link to="/trivia">
                <button
                  type="button"
                  name="login-button"
                  disabled={ loginButtonDisabled }
                  data-testid="btn-play"
                  onClick={ this.onSubmit }
                >
                  Entrar
                </button>
              </Link> */}
              <button
                type="button"
                name="login-button"
                disabled={ loginButtonDisabled }
                data-testid="btn-play"
                onClick={ this.onSubmit }
              >
                Entrar
              </button>
            </form>
            <Link to="/config">
              <button
                type="button"
                name="config-button"
                data-testid="btn-settings"
              >
                Configurações
              </button>
            </Link>
          </div>
        )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savePlayerName: (name) => dispatch(savePlayerNameAct(name)),
  savePlayerEmail: (email) => dispatch(savePlayerEmailAct(email)),
  saveToken: (token) => dispatch(saveTokenAction(token)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  savePlayerName: PropTypes.func.isRequired,
  savePlayerEmail: PropTypes.func.isRequired,
  saveToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
