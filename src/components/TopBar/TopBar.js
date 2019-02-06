import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TopBar.scss';

import SVG from 'react-inlinesvg';
import fakelogo from '../../image/fakelogo.svg';
import searchIcon from '../../image/search.svg';
import faker from 'faker';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };

    }
    handleKeyword(keyword) {
        this.props.onSelectKeyword(keyword);
        this.setState({
            keyword:keyword
        });

    }
    render() {
        console.log("topbar props:", this.props);
        return (<div className='topbar'>
                <SVG src={fakelogo} className='logo'></SVG>
                <div className='search'>
                    <SVG src={searchIcon} >search</SVG>
                    {typeof this.props.onSelectKeyword==='function' && <input type="text" value={this.state.keyword} onChange={(e)=>this.handleKeyword(e.target.value)}/>}
                </div>
                <div className='favorites'>
                    favorite
                </div>
            </div>

        );
    }
}

TopBar.propTypes = {
    keyword: PropTypes.string,
    onSelectKeyword: PropTypes.func
};
//             <SVG src={fakelogo} className='logo'></SVG>   <img src={fakelogo} alt='logo' />

export default TopBar
