import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { PlayArrow, SkipNext, Pause } from "@material-ui/icons";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.songDataReceived = this.songDataReceived.bind(this);
    this.songDataNotReceived = this.songDataNotReceived.bind(this);
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  songDataReceived() {
    const songProgress = (this.props.time / this.props.duration) * 100;

    return (
      <Card>
        <Grid container alignItems="center" spacing={1}>
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography component="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}
              >
                {this.props.is_playing ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton onClick={() => this.skipSong()}>
                {this.props.votes} / {this.props.votes_required}&nbsp;
                <SkipNext />
              </IconButton>
            </div>
            <Typography component="subtitle2" variant="caption">
              <br />
              Sound On and Play/Pause/Skip buttons are only
              <br />
              available with a host's Spotify Premium account subscription.
            </Typography>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }

  songDataNotReceived() {
    return (
      <Card>
        <Grid container alignItems="center" spacing={1}>
          <Grid item align="center" xs={12}>
            <Typography component="h1" variant="h1">
              &nbsp;
            </Typography>
            <Typography component="h5" variant="h5">
              No Song Is Currently Playing in the Host's Spotify Account
              <br />
              <br />A Commercial May Be Playing
            </Typography>
            <Typography component="h1" variant="h1">
              &nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  }

  render() {
    if (this.props.title) {
      return this.songDataReceived();
    } else {
      return this.songDataNotReceived();
    }
  }
}
