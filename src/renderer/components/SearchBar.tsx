import * as React from 'react';
import FieldContainer from './FieldContainer';
import styled from 'styled-components';

export interface Props {
    query: string;
    setQuery: (query: string) => void;
}

const SearchBar: React.FunctionComponent<Props> = ({ query, setQuery }) => (
    <FieldContainer>
        <StyledSearchInput
            autoFocus={true}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search..."
        />
        <IconContainer>
            <IconSearch />
        </IconContainer>
    </FieldContainer>
);

export default SearchBar;

const StyledSearchInput = styled('input')`
    font-size: 20px;
    line-height: 40px;
    padding-top: 20px;
    border: 0;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    background: white;
    border-radius: 3px;
    transition: all 0.4s ease;
    padding-left: 56px;
    padding-bottom: 2px;
    box-sizing: border-box;
`

const IconContainer = styled('div')`
    position: absolute;
    top: 24px;
    width: 35px;
    height: 35px;
    overflow: hidden;
    left: 10px
`

const IconSearch = styled('div')`
    position: relative;
    top: 5px;
    left: 10px;
    width: 50%;
    height: 50%;
    opacity: 1;
    border-radius: 50%;
    border: 2px solid #6a6a6a;
    transition: opacity 0.25s ease,transform 0.43s cubic-bezier(0.694, 0.048, 0.335, 1);
    &:after {
        content: '';
        position: absolute;
        bottom: -9px;
        right: -2px;
        width: 3px;
        border-radius: 3px;
        transform: rotate(-45deg);
        height: 10px;
        background-color: #6a6a6a;
    }
`
