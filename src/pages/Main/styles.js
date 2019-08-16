import styled, { keyframes, css } from 'styled-components';

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  div {
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
      flex: 1;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 16px;
      border: ${props =>
        props.hasError ? '2px solid #ea4335ba' : '2px solid #eee'};
    }
  }

  p {
    color: #ea4335;
    margin-top: 5px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(260deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #e9794b;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #e56029;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    /* Aplica estilização em todos os li, menos o primeiro*/
    /* & + li {
      border-top: 1px solid #fff;
    } */
    div {
      display: flex;
      justify-content: center;
      align-items: baseline;

      & > svg {
        color: #252525c7;

        &:hover {
          cursor: pointer;
          color: #252525;
        }
      }

      a {
        color: #e9794b;
        margin-left: 15px;

        &:hover {
          color: #e56029;
        }
      }
    }
  }
`;

/**
 * color: ${props => (props.error ? 'red' : '#7159c1')};
 * Captura as propriedades do elemento e verifica se existe
 * o parametro 'error', caso exista seta a cor como 'red', senão
 * como '#7159c1'
 */
