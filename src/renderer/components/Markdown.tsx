import * as React from 'react';
import Editor from 'rich-markdown-editor';
import { Document } from '../stores/editor/types';
import styled from 'styled-components';

export interface Props {
    markdown: string;
    onSave: (doc: Document) => void;
    setMarkdown: (markdown: string) => void;
    readOnly?: boolean;
    activeIdx?: string | undefined;
}

const Markdown: React.FunctionComponent<Props> = (
    { 
        markdown, 
        setMarkdown, 
        onSave, 
        readOnly = false, 
        activeIdx=undefined,
    }
) => (
    <MarkdownDiv>
        <Editor
            key={activeIdx}
            id={markdown}
            defaultValue={markdown}
            onSave={onSave}
            onCancel={null}
            onChange={setMarkdown}
            readOnly={readOnly}
        />
    </MarkdownDiv>
);

export default Markdown;

const MarkdownDiv = styled('div')`
    padding-top: 6px;
    width: 100%;
    height: calc(100% - 40px);
    font-size: 16px;
    padding: 20px;
    width: calc(100% - 40px);
    overflow-y: scroll;
`
