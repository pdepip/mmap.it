import * as React from 'react';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';

require('../components/Application.scss');

import Markdown from '../components/Markdown';
import SearchBar from '../components/SearchBar';
import QueryResults from '../components/QueryResults';

import { ApplicationState } from '../store';
import { 
    setQuery, 
    activeIdxIncrease,
    activeIdxDecrease,
    setActiveIdx,
    openDocument,
    deleteDocument,
    prependDocument,
} from '../store/search/actions';
import { Document } from '../store/search/types';

interface PropsFromState {
    query: string;
    activeIdx: number;
    documents: Document[];
}

interface PropsFromDispatch {
    setQuery: typeof setQuery;
    activeIdxIncrease: typeof activeIdxIncrease;
    activeIdxDecrease: typeof activeIdxDecrease;
    setActiveIdx: typeof setActiveIdx;
    openDocument: typeof openDocument;
    deleteDocument: typeof deleteDocument;
    prependDocument: typeof prependDocument;
}

type AllProps = PropsFromState & PropsFromDispatch;

class SearchPage extends React.Component<AllProps> {

    public handleKeyDown(e) {
        const { 
            documents,
            activeIdx,
            activeIdxIncrease,
            activeIdxDecrease,
            openDocument,
            deleteDocument,
        } = this.props;

        if (e.keyCode === 38 && activeIdx > 0) {
            activeIdxDecrease()
        } else if (e.keyCode === 40 && activeIdx < documents.length - 1) {
            activeIdxIncrease()
        } else if (e.key === "Enter") {
            openDocument()
        } else if (e.metaKey && e.key == 'd') {
            deleteDocument(documents[activeIdx])
        }

    }

    componentDidMount() {
        ipcRenderer.on('new-document', (e, doc) => {
            this.props.prependDocument(doc)
        });
    }

 	componentWillMount() {
    	document.addEventListener("keydown", this.handleKeyDown.bind(this));

        this.props.setQuery("")
    }

  	componentWillUnmount() {
    	document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  	}   

    public render() {
        const { 
            query, 
            documents,
            setQuery, 
            activeIdx,
            activeIdxIncrease,
            activeIdxDecrease,
            setActiveIdx,
        } = this.props;

        const markdown: string = documents.length > 0 ? documents[activeIdx].text : ""

        return (
            <div className="application">
                <div className="search-container">
                    <SearchBar query={query} setQuery={setQuery} />
                </div>
                <div className="body-container search-body">
                    <QueryResults 
                      documents={documents}
                      activeIdx={activeIdx}
                      increaseActiveIdx={activeIdxIncrease}
                      decreaseActiveIdx={activeIdxDecrease}
                      setActiveIdx={setActiveIdx}
                    />
                    <Markdown 
                      markdown={markdown} 
					  activeIdx={markdown}
                      onSave={() => console.log("no op")}
                      setMarkdown={() => console.log("no op")}
                      readOnly={true}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ search }: ApplicationState) => ({
    query: search.query,
    documents: search.documents,
    activeIdx: search.activeIdx,
});

const mapDispatchToProps = {
    setQuery,
    activeIdxIncrease,
    activeIdxDecrease,
    setActiveIdx,
    openDocument,
    deleteDocument,
    prependDocument
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
