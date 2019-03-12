import React from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

const Button = ({ storyId, onClick, title }) => (
  <button onClick={() => onClick(storyId)}>{title}</button>
);
class HomeBase extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    stories: []
  };

  getStories = () => {
    this.props.firebase.getStories().then(data => {
      this.setState({ stories: data });
    });
  };

  getOneStory = storyId => {
    this.props.firebase.getOneStory(storyId);
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <button onClick={this.getStories}>Get Test Data: Stories</button>
        <button onClick={this.getOneStory}>Get One Story</button>
        {this.state.stories.length > 0 && (
          <React.Fragment>
            <p>We have stories!</p>
            {this.state.stories.map((story, i) => (
              <Button
                key={story.id}
                storyId={story.id}
                title={story.title}
                onClick={this.getOneStory}
              />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const Home = compose(
  withAuthorization(condition),
  withFirebase
)(HomeBase);

export default Home;
