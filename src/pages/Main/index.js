import React, { Component } from 'react';
import lowerCase from 'lower-case';
import { FaGithubAlt, FaPlus, FaSpinner, FaEye, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Header } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    hasError: false,
    errorText: '',
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });

    try {
      if (!newRepo) {
        throw String('Insira um repositório');
      }

      if (
        repositories.find(
          repository => lowerCase(repository.name) === lowerCase(newRepo)
        )
      ) {
        throw String('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        hasError: false,
        errorText: '',
      });
    } catch (error) {
      /**
       * Se o conteudo do 'error' não for uma string, significa que a requisição feita a api
       * não foi encontrada, retornando um objeto com o conteudo do erro
       */
      const errorText =
        typeof error !== 'string' ? 'Repositório não encontrado' : error;
      // console.log(errorText);
      this.setState({
        hasError: true,
        loading: false,
        errorText,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleRemoveRepo = repositoryName => {
    /**
     * Cria um novo array 'repositories' excluindo o repositorio passado
     * quando o usuário clica em remover
     * */
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter(
        repository => repository.name !== repositoryName
      ),
    });
  };

  render() {
    const { newRepo, loading, repositories, hasError, errorText } = this.state;

    return (
      <Container>
        <Header>
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>
        </Header>

        <Form onSubmit={this.handleSubmit} hasError={hasError}>
          <div>
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            {/* '+' é um operador unário que converte 'true' para '1', e 'false' para '0'
              essa condição foi necessária pois a propriedade 'loading' não aceita valores booleanos
          */}
            <SubmitButton loading={+loading}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </div>
          {/* {console.log(errorText)} */}
          {errorText ? <p> {errorText} </p> : ''}
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <FaTimes
                  size={20}
                  onClick={() => this.handleRemoveRepo(repository.name)}
                />
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  <FaEye size={20} />
                </Link>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
