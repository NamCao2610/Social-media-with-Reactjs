import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';
import { connect } from 'react-redux';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Thêm nhũng kinh nghiệm làm việc
      </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Thêm những công việc và kinh nghiệm bạn đã làm trong quá khứ và hiện tại
      </p>
            <small>* = yêu cầu bắt buộc</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Tên công việc" name="title" value={title} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Công ty" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Khu vực" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>Thời gian bắt đầu</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} checked={current} onChange={e => { setFormData({ ...formData, current: !current }); toggleDisabled(!toDateDisabled) }} />{' '} Hiện tại vẫn đang làm</p>
                </div>
                <div className="form-group">
                    <h4>Thời gian kết thúc</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Chi tiết công việc"
                        value={description} onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Trở về trang trước</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience));
