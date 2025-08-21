import { keyframes } from 'styled-components';

const slideInRight = keyframes`
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;


export default {slideInRight, slideInLeft}