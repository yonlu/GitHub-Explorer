import styled from 'styled-components';

export const RepositoryContainer = styled.div``;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 5rem;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
      & + li {
        margin-left: 80px;
      }
      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    header {
      img {
        width: 60px;
        height: 60px;
      }

      div {
        strong {
          font-size: 24px;
          color: #3d3d4d;
        }

        p {
          font-size: 16px;
          color: #737380;
          margin-top: 4px;
        }
      }
    }

    ul {
      display: flex;
      justify-content: center;

      li {
        strong {
          font-size: 18px;
        }
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 5rem;

  .issue {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 1.5rem;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + article {
      margin-top: 1rem;
    }

    a {
      div {
        width: fit-content;
        height: fit-content;

        strong {
          font-size: 20px;
          color: #3d3d4d;
        }

        p {
          font-size: 18px;
          color: #a8a8b3;
          margin-top: 4px;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    a {
      padding: 12px;
      display: flex;

      div {
        strong {
          font-size: 14px;
          flex-grow: 1;
        }

        p {
          font-size: 14px;
        }
      }

      svg {
        display: none;
      }
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    .issue {
      padding: 0.5rem;

      a {
        div {
          strong {
            font-size: 14px;
          }

          p {
            font-size: 12px;
          }
        }
      }
    }
  }
`;
