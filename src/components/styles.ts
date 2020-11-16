import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface LabelProps {
  backgroundColor: string;
}

export const LabelContainer = styled.div<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    min-width: 100px;
    width: auto;
    height: auto;

    border: 0;
    padding: 0.5em;
    border-radius: 1.5em;

    font-size: 1em;
    font-weight: bold;
    color: #fff;

    transition: background-color 0.2s;

    ${props =>
      props.backgroundColor &&
      css`
        background-color: #${props.backgroundColor};

        &:hover {
          background: ${shade(0.2, `#${props.backgroundColor}`)};
        }
      `}
  }
`;
