import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ post: { posts, loading }, getPosts }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        loading ? (<Spinner />) : (<Fragment>
            <h1 className="large text-primary">Các bài đăng</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Xin chào đến với cộng đồng và các bài đăng
           </p>
            <PostForm />
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>)
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
