import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import {media} from '../../lib/style-utils';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Sizer = styled.div`
    display: inline-block;
    width: 25%;
    padding: 0.5rem;
    
    ${media.desktop`
        width: 33.3333%;
    `}
    
    ${media.mobile`
        width: 50%;
        padding: 0.25rem;
    `}
`;

const Square = styled.div`
    padding-top: 100%;
    position: relative;
    background: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    
    &:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
`;

const Contents = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    bottom: 1rem;
    right: 1rem;
    
    white-space: pre-wrap;
    overflow: hidden;
`;

const Title = styled.div`
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
`;

const Body = styled.div`
    font-size: 1.1rem;
    font-weight: 300;
    color: ${oc.gray[7]};
`;

class Memo extends Component {
    static propTypes = {
        memo: ImmutablePropTypes.mapContains({
            id: PropTypes.number,
            title: PropTypes.string,
            body: PropTypes.string
        }),
        onOpen: PropTypes.func
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.memo !== this.props.memo;
    }

    handleClick = () => {
        const {memo, onOpen} = this.props;
        onOpen(memo);
    };

    render() {
        const {title, body} = this.props.memo.toJS();
        const {handleClick} = this;

        return (
            <Sizer>
                <Square onClick={handleClick}>
                    <Contents>
                        {title && <Title>{title}</Title>}
                        <Body>{body}</Body>
                    </Contents>
                </Square>
            </Sizer>
        )
    }
}

export default Memo;