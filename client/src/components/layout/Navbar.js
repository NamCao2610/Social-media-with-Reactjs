import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Danh sách người dùng
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    Bài đăng thảo luận
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Cá nhân</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Dang xuat</span>
                </a>
            </li>
        </ul>
    );

    const guestLink = (
        <ul>
            <li><Link to="/profiles">Danh sách người dùng</Link></li>
            <li><Link to="/register">Đăng kí</Link></li>
            <li><Link to="/login">Đăng nhập</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-meteor text-primary"></i> NamDepZai</Link>
            </h1>
            { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLink}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar);
