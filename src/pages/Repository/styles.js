import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(260deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  & div:first-child {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-weight: bold;
    padding-left: 15px;
  }

  a {
    text-decoration: none;
    color: #1d1b1b;
    font-size: 16px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 40px;
  margin-bottom: 20px;

  button {
    padding: 4px;
    background: #eee;
    border: 0;
    /* color: ${props => (props.error ? 'red' : '#7159c1')}; */
    margin-right: 10px;
    font-weight: bold;

    &.active {
      border-bottom: 2px solid #e9794b;
    }
  }
`;

export const IssueList = styled.ul`
  margin: 20px 0;
  min-height: 410px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    /* & + li {
      margin-top: 10px;
    } */

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #e9794b;

          &:hover {
            color: #e56029;
          }
        }

        span {
          background: #4c4c4c;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #777;
      }
    }
  }
`;

export const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    font-weight: bold;
    margin: 0 15px;
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    background: #e9794b;

    &:hover {
      background: #e56029;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
