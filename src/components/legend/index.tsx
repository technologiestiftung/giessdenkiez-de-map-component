import React from 'react';
import styled from 'styled-components';

import { SetLayer } from '../map/types';

const LegendContainer = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: white;
  :hover {
    cursor: pointer;
  }
  p {
    font-size: 12px;
    margin: 0;
    padding: 6px 12px;
  }
  p:hover {
    background: #aaa;
  }
`;

interface LegendProps {
  setLayer: SetLayer;
}

const Legend = ({ setLayer }: LegendProps): JSX.Element => {
  return (
    <LegendContainer>
      {['trees', 'watered', 'adopted', 'pumps', 'rain'].map((layer, key) => {
        return (
          <p key={key} onClick={() => setLayer(layer)}>
            {layer}
          </p>
        );
      })}
    </LegendContainer>
  );
};

export default Legend;
