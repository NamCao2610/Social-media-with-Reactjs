import React, { Fragment } from 'react'
import PropTypes from 'prop-types'


const ProfileAbout = ({ profile: { bio, skills, user: { name } } }) =>
    (

        <div className="profile-about bg-light p-2">
            { bio && <Fragment>
                <h2 className="text-primary">Mô tả về {name.trim().split(' ')[0]}</h2>
                <p>
                    {bio}
                </p>
                <div className="line"></div>
            </Fragment>}
            <h2 className="text-primary">Kĩ năng</h2>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        <i className="fas fa-check"></i> {skill}
                    </div>
                ))}
            </div>
        </div>
    )

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
