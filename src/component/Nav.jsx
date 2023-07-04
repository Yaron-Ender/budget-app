import React from 'react';
import { Form, NavLink } from 'react-router-dom';
//assets
import logomark from '../assets/logomark.svg'
//laibary
import { TrashIcon } from "@heroicons/react/24/solid";
const Nav = ({userName}) => {
    return (
        <nav>
    <NavLink to='/' aria-label='Go to home'>
    <img src={logomark} alt="logo" height={30} />
    <span>HomeBuget</span>
    </NavLink>
    {userName&&
    <Form
    method='post'
    action='/logout'
    onSubmit={(event) => {
    if (!window.confirm("Delete user and all data?")) {
    event.preventDefault()
    }
  }}
    >
    <button type="submit"
    className="btn btn--warning"
    >
    <span>Delete User</span>
        <TrashIcon width={20} />
    </button>
    </Form>
    }
        </nav>
    );
};

export default Nav;