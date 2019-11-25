import React from 'react';
import { Segment } from 'semantic-ui-react';
import '../App.css';
import Transportation from './Transportation';
import Artificial from './Artificial';
import Art from './Art';
import B2B from './B2B';
import Banking from './Banking';
import Cannabis from './Cannabis';
import Communications from './Communications';
import Delivery from './Delivery';
import Developer from './Developer';
import Education from './Education';
import Environmental from './Environmental';
import Food from './Food';
import Gaming from './Gaming';
import Hardware from './Hardware';
import Healthcare from './Healthcare';
import Hospitality from './Hospitality';
import Hr from './HR';
import Industrial from './Industrial';
import InfoTech from './InfoTech';
import Legal from './Legal';
import Lifestyle from './Lifestyle';
import Marketing from './Marketing';
import Marketplace from './Marketplace';
import Media from './Media';
import NonProfit from './NonProfit';
import Security from './Security';
import SaaS from './SaaS';
import Sports from './Sports';
import Travel from './Travel';
import WebDev from './WebDev';

class ExplorePage extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Segment  className="exploreScroll"
                    style={{ 
                        background: 'none',
                        boxShadow: 'none', 
                        border: 'none',
                        height: '98vh',
                    }}
                >
                <div>
                <Transportation />
                <Artificial />
                <Art />
                <B2B />
                <Banking />
                <Cannabis />
                <Communications />
                <Delivery />
                <Developer />
                <Education />
                <Environmental />
                <Food />
                <Gaming />
                <Hardware />
                <Healthcare />
                <Hospitality />
                <Hr />
                <Industrial />
                <InfoTech />
                <Legal />
                <Lifestyle />
                <Marketing />
                <Marketplace />
                <Media />
                <NonProfit />
                <Security />
                <SaaS />
                <Sports />
                <Travel />
                <WebDev />
                </div>
                </Segment>
            </React.Fragment>
        );
    }
}

export default ExplorePage;