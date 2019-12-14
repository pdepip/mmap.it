import * as React from 'react';
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
}

type AllProps = PropsFromState & PropsFromDispatch;

/*
const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};
*/

class SearchPage extends React.Component<AllProps> {

    public handleKeyDown(e) {
        const { 
            documents,
            activeIdx,
            activeIdxIncrease,
            activeIdxDecrease,
        } = this.props;

        if (e.keyCode === 38 && activeIdx > 0) {
            activeIdxDecrease()
        } else if (e.keyCode === 40 && activeIdx < documents.length - 1) {
            activeIdxIncrease()
        }
    }

 	componentWillMount() {
    	document.addEventListener("keydown", this.handleKeyDown.bind(this));
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
        } = this.props;

        const markdown: string = documents[activeIdx].text
		console.log(activeIdx, markdown)

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
                    />
                    <Markdown 
                      markdown={markdown} 
					  activeIdx={activeIdx}
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
