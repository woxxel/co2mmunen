import React from 'react';
import { NavLink } from 'react-router-dom';

// import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li><NavLink
                to="/browse"
                activeClassName={classes.active}>Klimaziele</NavLink></li>
        <li><NavLink
                to="/list"
                activeClassName={classes.active}>Support</NavLink></li>
    </ul>
);

export default navigationItems;
