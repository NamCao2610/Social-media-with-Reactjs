import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = ({ experience: { company, title, location, current, to, from, description } }) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="DD/MM/YYYY">{from}</Moment> - {!to ? 'Hiện tại' : <Moment format="DD/MM/YYYY">{to}</Moment>}
            </p>
            <p>
                <strong>Vị trí: </strong>{title}
            </p>
            <p>
                <strong>Mô tả công việc: </strong>{description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience
