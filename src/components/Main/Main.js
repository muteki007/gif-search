import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Main.scss';
import SideBar from '../SideBar/SideBar';
import Grid from '../Grid/Grid';


class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className='main'>
                <div>
                    <SideBar />
                    <Grid />
                </div>
            </div>

        );
    }
}

Main.propTypes = {
    data: PropTypes.object
};
//             <SVG src={fakelogo} className='logo'></SVG>   <img src={fakelogo} alt='logo' />

export default Main;
