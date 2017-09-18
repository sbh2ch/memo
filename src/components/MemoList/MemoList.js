import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {media, transitions} from "../../lib/style-utils";
import ImmutablePropTypes from 'react-immutable-proptypes';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Memo from './Memo';

const Wrapper = styled.div`
    display: block;
    margin-top: 0.5rem;
    font-size: 0px;
    
    ${media.mobile`
        margin-top: 0.25rem;
    `}
    
    .memo-enter {
        animation: ${transitions.stretchOut} .3s ease-in;
        animation-fill-mode: forwards;
    }
    
    .memo-leave {
        animation: ${transitions.shrinkIn} .15s ease-in;
        animation-fill-mode: forwards;
    }
`;

const MemoList = ({memos, onOpen}) => {
    const memoList = memos.map(
        memo => (
            <Memo
                key={memo.get('id')}
                memo={memo}
                onOpen={onOpen}
            />
        )
    );

    return (
        <Wrapper>
            <CSSTransitionGroup
                transitionName="memo"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={150}
            >
                {memoList}
            </CSSTransitionGroup>
        </Wrapper>
    );
};

MemoList.propTypes = {
    memos: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            id: PropTypes.number,
            title: PropTypes.string,
            body: PropTypes.string
        })
    ),
    onOpen: PropTypes.func
};

export default MemoList;