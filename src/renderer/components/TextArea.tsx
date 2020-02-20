import * as React from 'react';
import styled from 'styled-components';

export interface Props {
    text: string;
    updateText: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
}

const TextArea: React.FunctionComponent<Props> = ({ text, updateText }) => (
    <TextAreaContainer>
        <StyledTextArea
            id="input"
            onChange={updateText}
            value={text}
            placeholder="Enter Text Here"
        />
    </TextAreaContainer>
);

export default TextArea;

const StyledTextArea = styled('textarea')`
    font-size: 16px;
    background-color: #fbfdff;
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
`

const TextAreaContainer = styled('div')`
    width: 100%;
    height: calc(100% - 40px);
    font-size: 16px; 
    padding: 20px;
    width: calc(100% - 40px);
`
