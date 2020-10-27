import React, { Fragment } from 'react'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i> Không tìm thấy trang này 404 Not Found
            </h1>
            <p className="large">Xin lỗi vì sự bất tiện này</p>
        </Fragment>
    )
}

export default NotFound;
