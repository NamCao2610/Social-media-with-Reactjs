import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {

    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - {
                    exp.to === null ? ('Hiện tại') : (<Moment format='DD/MM/YYYY'>{exp.to}</Moment>)
                }
            </td>
            <td><button className="btn btn-danger" onClick={e => deleteExperience(exp._id)}>Xóa</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Kinh nghiệm làm việc</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Công ty</th>
                        <th className="hide-sm">Các Công việc</th>
                        <th className="hide-sm">Thời gian từ</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience);
