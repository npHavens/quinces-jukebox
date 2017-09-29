import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const PlaylistEntry = (props) => {
  const handleUpVote = () => {
    props.upVote(props.Song);
  }

  const handleDownVote = () => {
    props.downVote(props.Song);
  }

  const handlePlayButtonClick = () => {
    props.handlePlay(props.Song);
  }

  const cardStyle = {
    display: 'block',
    margin: '40px',
    width: '250px',
    transitionDuration: '0.3s',
  }

  const containerStyle = {
    height: '300px'
  }

  return (

      <Card style={cardStyle}>
        <CardMedia>
          <img src={props.Song.image} alt="" />
        </CardMedia>
        <CardTitle title={props.Song.name} subtitle="Artist name here" />
        <CardText>
          <button onClick={handlePlayButtonClick}>Play</button>
          Added by: {props.Song.userName}
        </CardText>
        <CardActions>
          <FloatingActionButton onClick={handleUpVote} mini={true}>
            +{props.Song.upVoteCount}
          </FloatingActionButton>
          <FloatingActionButton onClick={handleDownVote} mini={true} secondary={true}>
            -{props.Song.downVoteCount}
          </FloatingActionButton>
        </CardActions>
    </Card>
  )
}

export default PlaylistEntry;