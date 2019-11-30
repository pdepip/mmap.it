import * as React from 'react';
import { connect } from 'react-redux';

require('../components/Application.scss');

import Markdown from '../components/Markdown';
import SearchBar from '../components/SearchBar';
import QueryResults from '../components/QueryResults';

import { ApplicationState } from '../store';
import { setQuery } from '../store/search/actions';
import { Document } from '../store/editor/types';

interface PropsFromState {
    query: string;
    //document: Document;
}

interface PropsFromDispatch {
    setQuery: typeof setQuery;
}

type AllProps = PropsFromState & PropsFromDispatch;

class SearchPage extends React.Component<AllProps> {

    public render() {
        const { query, setQuery } = this.props;
        const markdown: string = ""

        return (
            <div className="application">
                <div className="search-container">
                    <SearchBar query={query} setQuery={setQuery} />
                </div>
                <div className="body-container">
                    <QueryResults />
                    <Markdown 
                      markdown={markdown} 
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
});

const mapDispatchToProps = {
    setQuery,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
