import styled from 'styled-components';

export default styled.button`
  text-align: center;
  width: 120px;
  border-radius: 5px;
  border: 0;
  background-color: ${(props) => 
    props.white ? "#fff": "#000"
  };
`;