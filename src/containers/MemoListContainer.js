import React, {Component} from 'react';
import {connect} from 'react-redux';
import MemoList from '../components/MemoList';
import {bindActionCreators} from 'redux';
import * as uiActions from '../modules/ui';

class MemoListContainer extends Component {
    render() {

        return (
            <MemoList
                memos={this.props.memos}
                onOpen={this.props.UIActions.openViewer}
            />
        )
    }
}

export default connect((state) => ({
        memos: state.memo.get('data')
    }), (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(MemoListContainer);