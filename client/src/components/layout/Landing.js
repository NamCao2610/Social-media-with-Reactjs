import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Mạng Xã Hội Thông Tin</h1>
                    <p className="lead">
                        Chia sẻ thông tin cá nhân và cùng nhau kết nối qua bài đăng bình luận
          </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Đăng kí</Link>
                        <Link to="/login" className="btn btn-light">Đăng nhập</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
