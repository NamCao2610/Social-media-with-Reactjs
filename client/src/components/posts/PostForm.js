import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Hãy đăng một điều gì đó</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addPost({ text });
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    placeholder="Tạo 1 bài viết"
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Thêm bài viết" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm);
