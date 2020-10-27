import React from 'react'
import { Link } from 'react-router-dom';

const DashboardActions = props => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Chỉnh sửa hồ sơ cá nhân</Link>
            <Link to="/add-experience" className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> Thêm kinh nghiệm làm việc</Link>
            <Link to="/add-education" className="btn btn-light"
            ><i className="fas fa-graduation-cap text-primary"></i> Thêm học vấn ,theo học</Link>
        </div>
    )
}


export default DashboardActions
