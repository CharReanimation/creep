import React from 'react'; // React

// CSS
import './css/Header.css'
import "../../global/css/global_anim.css"

// Header
const Header = ({ HeaderText }) => {
    // Return
    return (
        <header className='page-header anim-up-to-down'>
            <h1 className='page-header-h1'>{HeaderText}</h1>
        </header>
    );
};

// Export
export default Header;