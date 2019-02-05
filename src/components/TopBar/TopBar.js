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
    }

    render() {
        console.log(this.props);
        return (<div className='topbar'>
                <SVG src={fakelogo} className='logo'></SVG>
                <div className='search'>
                    <SVG src={searchIcon} >search</SVG>
                    <input type="text" onChange={(e)=>this.props.onSelectKeyword(e.target.value)}/>
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
    onSelectKeyword: PropTypes.function
};
//             <SVG src={fakelogo} className='logo'></SVG>   <img src={fakelogo} alt='logo' />

export default TopBar
