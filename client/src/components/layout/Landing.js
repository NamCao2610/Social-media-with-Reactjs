import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
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

export default Landing;
