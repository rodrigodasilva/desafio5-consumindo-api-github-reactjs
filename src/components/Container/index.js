import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #eee;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
