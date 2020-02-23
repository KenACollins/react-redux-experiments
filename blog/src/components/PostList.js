import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import UserHeader from './UserHeader';
 
class PostList extends React.Component {
    /**
     * componentDidMount() runs AFTER the component has finished rendering, so initially, the screen loads
     * with render() generating DOM elements with no data because this.props.posts is an empty array. Then,
     * this method runs, updates both the posts and users state properties, and this component notices that
     * the state it is dependent on, the props property, has changed and it renders the component again, but
     * now able to display data.
     */
    componentDidMount() {
        this.props.fetchPostsAndUsers();    // We receive these props from the connect()() function below.
    }

    renderList() {
        return this.props.posts.map(post => {
            return (
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId} />
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div className="ui relaxed divided list">{this.renderList()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);