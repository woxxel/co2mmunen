import React from 'react';

import classes from './Toolbar.module.css';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.ToolbarContent}>
        <img
            src='/assets/images/co2mmunenLogo.png'
            alt='co2mmunen Logo'
            className={classes.ToolbarLogo}/>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </div>
    </header>
);

export default toolbar;
