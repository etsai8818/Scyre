import React from "react";
import { Helmet } from 'react-helmet';
import { Grid } from "semantic-ui-react";
import "./App.css";
import { connect } from 'react-redux';
import favicon from './Images/favicon.png';

import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import ExplorePage from './Explore/ExplorePage';

import scyreDiamond from './Images/scyre-diamond.png';
/* import MetaPanel from './MetaPanel/MetaPanel'; */

const App = ({ currentUser, currentChannel, isPrivateChannel, isExplorePage }) => (
  <div>
    <Helmet>
    <meta charSet="utf-8" />
          <title>Scyre</title>
          <link rel="shortcut icon" type="image/png" href={favicon}></link>
    </Helmet>
    <div className="mobileAppBG">
          <div className="mobileAppBGContent">
          <img src={scyreDiamond} alt="diamond" />
          <h2>Start by using Scyre on a desktop or tablet.</h2>
          </div>
    </div>
  <div className="circleBg" style={{paddingBottom: '15px', backgroundAttachment: 'fixed'}}>
    <div className="centerContainer">
      <Grid columns="equal" className="app" style={{paddingTop: '5px'}}>
        <SidePanel className="sideAppPanel" />

        {!isExplorePage && (<Grid.Column className="gridColumnMargin1">
          <Messages 
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
            isPrivateChannel={isPrivateChannel}
            isExplorePage={isExplorePage}
          />
        </Grid.Column>)}

        {!isPrivateChannel && !currentChannel && (<Grid.Column className="gridColumnMargin2" >
          <ExplorePage
            currentUser={currentUser}
            isExplorePage={isExplorePage}
          />
        </Grid.Column>)}

        

        {/*<Grid.Column width="4">
          <MetaPanel />
        </Grid.Column> */}
      </Grid>
    </div>
  </div>
        
  </div>            
);

const mapStateToProps = state => ({
  currentUser: state.user.currrentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  isExplorePage: state.channel.isExplorePage,
});

export default connect(mapStateToProps)(App);
