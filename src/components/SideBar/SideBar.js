import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SideBar.scss';


class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className='sidebar'>
                nav...
            </div>

        );
    }
}

SideBar.propTypes = {
    data: PropTypes.object
};
//             <SVG src={fakelogo} className='logo'></SVG>   <img src={fakelogo} alt='logo' />

export default SideBar;
