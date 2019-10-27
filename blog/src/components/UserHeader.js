import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends React.Component {
    // We get access to fetchUser() action creator through props passed to us from the connect() function below.
    componentDidMount() {
        this.props.fetchUser(this.props.userId);
    }

    render() {
        const user = this.props.users.find(user => user.id === this.props.userId);

        if (!user) {
            return null;
        }

        return <div className="header">{user.name}</div>;
    }
}

const mapStateToProps = state => {
    return { users: state.users };
};

export default connect(mapStateToProps, { fetchUser })(UserHeader);