import * as React from 'react';
import { Document } from '../stores/search/types';
import * as classnames from 'classnames';
import styled from 'styled-components';

export interface Props {
    activeIdx: number;
    documents: Document[];
    increaseActiveIdx: () => void;
    decreaseActiveIdx: () => void;
    setActiveIdx: (idx: number) => void;
}

interface ItemProps {
    active: boolean;
    key: number;
    onClick: () => void;
}

const QueryResults: React.FunctionComponent<Props> = ({documents, activeIdx, setActiveIdx}) => (
    <StyledSearchResults>

    { documents.map((document, idx) => {
        return (
            <Item 
                active={idx === activeIdx}
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

const Item = styled.div<ItemProps>`
    padding: 10px;
    cursor: pointer;
    font-size: 14px;

  ${( p: ItemProps ) => p.active && `
      background-color: rgb(63, 147, 247);
      color: #fff;
  `}
`
