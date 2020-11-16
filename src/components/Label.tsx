import React from 'react';

import { LabelContainer } from './styles';

interface LabelDTO {
  url: string;
  name: string;
  color: string;
}

const Label: React.FC<LabelDTO> = ({ url, name, color }: LabelDTO) => {
  return (
    <LabelContainer backgroundColor={color}>
      <a href={url} rel="noopener noreferrer" target="_blank">
        <button type="button">{name}</button>
      </a>
    </LabelContainer>
  );
};

export default Label;
