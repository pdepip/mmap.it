import * as React from 'react';
import { Document } from '../store/search/types';
import classnames from 'classnames';
import styled from 'styled-components';

export interface Props {
    activeIdx: number;
    documents: Document[];
    increaseActiveIdx: () => void;
    decreaseActiveIdx: () => void;
    setActiveIdx: (number) => void;
}

const QueryResults: React.FunctionComponent<Props> = ({documents, activeIdx, setActiveIdx}) => (
    <StyledSearchResults>

    { documents.map((document, idx) => {
            return (
                <Item 
                  active={idx == activeIdx}
                  key={idx} 
                  onClick={() => setActiveIdx(idx)}
                >
                {document.title}
                </Item>
            )
        })
    }
    </StyledSearchResults>
);

export default QueryResults;

const StyledSearchResults = styled('div')`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 300px;
    overflow-y: scroll;

    background-color: rgb(246,246,246);
    border-right: 1px solid rgb(222, 222, 222);
`

const Item = styled('div')`
    padding: 10px;
    cursor: pointer;
    font-size: 14px;

  ${({ active }) => active && `
      background-color: rgb(63, 147, 247);
      color: #fff;
  `}
`
