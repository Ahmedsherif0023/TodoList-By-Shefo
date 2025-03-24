import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Todo List</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;