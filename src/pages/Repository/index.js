import React, { Component } from 'react';
import { FaSpinner, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Filter, Pagination } from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {}, // Um único respositório, iniciamos como objeto
    issues: [], // Várias issues, inicializamos a variavel como array
    loading: true,
    stateIssue: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { stateIssue } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    /**
     * Executa as duas chamadas à api e aguarda elas terminarem
     * para seguir a execução do código
     */

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateIssue,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    console.log(this.state.page);
    const { match } = this.props;
    const { page, stateIssue } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: stateIssue,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handlePagination = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'next' ? Number(page) + 1 : Number(page) - 1,
    });
    this.loadIssues();
  };

  filterIssue = async filter => {
    await this.setState({ stateIssue: filter, page: 1 });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, stateIssue, page } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#e9794b" size={40} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <div>
            <Link to="/">
              <FaChevronLeft size={30} />
            </Link>
          </div>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <Filter>
            <button
              type="button"
              onClick={() => this.filterIssue('all')}
              className={stateIssue === 'all' ? 'active' : ''}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => this.filterIssue('open')}
              className={stateIssue === 'open' ? 'active' : ''}
            >
              Open
            </button>
            <button
              type="button"
              onClick={() => this.filterIssue('closed')}
              className={stateIssue === 'closed' ? 'active' : ''}
            >
              Closed
            </button>
          </Filter>

          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePagination('back')}
          >
            Back
          </button>
          <span>Page {page}</span>
          <button type="button" onClick={() => this.handlePagination('next')}>
            Next
          </button>
        </Pagination>
      </Container>
    );
  }
}
