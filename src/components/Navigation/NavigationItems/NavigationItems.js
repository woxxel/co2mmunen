import React from 'react';
// import { NavLink } from 'react-router-dom';

// import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li><a
                href="http://rechner.co2mmunen.de/"
                className={classes.active}>CO2-Rechner</a></li>
        <li><a
                href="https://devpost.com/software/co2mmunen">devPost</a></li>
        <li><a
                href="https://www.canva.com/design/DAEZUCbDB3k/ltdxo7n2ZChRZnS-ER-qpg/view">Was bieten wir?</a></li>
        <li><a
                href="https://docs.google.com/forms/d/e/1FAIpQLScwVi-OsWwxDLrLqDFpCwHqRRvDUwMLlGR8NT1TJqBDiUJZ8w/viewform">Kontakt</a></li>
    </ul>
);

export default navigationItems;
