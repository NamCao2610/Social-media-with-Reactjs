import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEducation = ({ education: { school, degree, fieldofstudy, current, to, from, description } }) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="DD/MM/YYYY">{from}</Moment> - {!to ? 'Hiện tại' : <Moment format="DD/MM/YYYY">{to}</Moment>}
            </p>
            <p>
                <strong>Bằng chứng nhận, chứng chỉ: </strong>{degree}
            </p>
            <p>
                <strong>Chuyên ngành: </strong>{fieldofstudy}
            </p>
            <p>
                <strong>Mô tả công việc: </strong>{description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation;
