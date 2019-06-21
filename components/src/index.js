import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';


const App = () => {
    return (
        <div className="ui container comments">
            <ApprovalCard>
                <h4>Warning!</h4>
                Are you sure?
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Sam" timePosted="Today at 1:00PM" comment="Very funny!" avatarURL={faker.image.avatar()} />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Alex" timePosted="Today at 3:45PM" comment="You rock!" avatarURL={faker.image.avatar()} />
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Jane" timePosted="Today at 6:30PM" comment="I love it!" avatarURL={faker.image.avatar()} />
            </ApprovalCard>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));