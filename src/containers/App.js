import React, {Component} from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import WriteMemo from './WriteMemo';
import MemoListContainer from './MemoListContainer';
import MemoViewContainer from './MemoViewContainer';
import Spinner from '../components/Spinner';

import * as memoActions from '../modules/memo';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends Component {
    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const {MemoActions} = this.props;

        try {
            await MemoActions.getInitialMemo();
            //this.getRecentMemo();
        } catch (e) {
            console.log(e);
        }
    }

    handleScroll = (e) => {
        const {clientHeight, scrollTop} = document.body;
        const {innerHeight} = window;

        if (clientHeight - innerHeight - scrollTop < 100) {
            const {endCursor, MemoActions} = this.props;

            if (!endCursor || this.endCursor === endCursor) return;

            this.endCursor = endCursor;

            MemoActions.getPreviousMemo(endCursor);
        }

    };

    getRecentMemo = () => {
        const {MemoActions, cursor} = this.props;

        MemoActions.getRecentMemo(cursor ? cursor : 0);

        setTimeout(() => {
            this.getRecentMemo();
        }, 1000 * 5)
    };

    render() {
        const {pending} = this.props;

        return (
            <Layout>
                <Header/>
                <Layout.Main>
                    <WriteMemo/>
                    <MemoListContainer/>
                    <Spinner visible={pending['memo/GET_INITIAL_MEMO'] || pending['memo/GET_PREVIOUS_MEMO']}/>
                </Layout.Main>
                <MemoViewContainer/>
            </Layout>
        );
    }
}

export default connect((state) => ({
        cursor: state.memo.getIn('data', 0, 'id'),
        endCursor: state.memo.getIn(['data', state.memo.get('data').size - 1, 'id']),
        pending: state.pender.pending
    }), (dispatch) => ({
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(App);