import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Main.scss';
import SideBar from '../SideBar/SideBar';
import Grid from '../Grid/Grid';


class Main extends Component {
    constructor(props) {
        super(props);
        console.log("main props", this.props);
    }

    render() {
        const {data:images=[],pagination={}}= this.props && this.props.imageData || {};
        return (<div className='main'>
        <ul>
          {images.map(image => (
            <li key={image.id}>
              <a href={image.url}>
                {image.images && image.downsized_small || image.title}
              </a>
            </li>
        ))}
        </ul>
                <div>
                    <SideBar />
                    <Grid />
                </div>
            </div>

        );
    }
}

Main.propTypes = {
    images: PropTypes.array
};
//             <SVG src={fakelogo} className='logo'></SVG>   <img src={fakelogo} alt='logo' />

export default Main;
