import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grid.scss';


class Grid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className='grid'>
            grid..
            </div>

        );
    }
}

Grid.propTypes = {
    data: PropTypes.object
};
//             <SVG src={fakelogo} className='logo'></SVG>   <img src={fakelogo} alt='logo' />

export default Grid;
