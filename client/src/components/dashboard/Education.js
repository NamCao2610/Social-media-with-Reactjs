import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {

    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {
                    edu.to === null ? ('Hiện tại') : (<Moment format='DD/MM/YYYY'>{edu.to}</Moment>)
                }
            </td>
            <td><button className="btn btn-danger" onClick={e => deleteEducation(edu._id)}>Xóa</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">Học vấn theo học</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Trường, khóa học</th>
                        <th className="hide-sm">Bằng cấp</th>
                        <th className="hide-sm">Thời gian từ</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education);
