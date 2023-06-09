import React from 'react';
import { NotificationAlert, Wrapper, SignupAlert } from './Dashboard.styled';
import BellIcon from '../../assets/icons/bell-icon';
import ChampionCup from '../../assets/icons/champion-cup';

const Dashboard = () => (
  <Wrapper>
    <NotificationAlert
      className="notification"
      icon={<BellIcon />}
      text="of a notification we want the user to be aware of."
      accentText="Here is the title"
    />
    <SignupAlert
      className="signup"
      icon={<ChampionCup />}
      text="Continue Learning About The PTA Events Platform"
      accentText="Onboarding 30% Complete"
    />
  </Wrapper>
);

export default Dashboard;
