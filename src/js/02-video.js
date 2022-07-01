import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe, {
  id: 19231868,
  width: 640,
});

continueToWatch();

player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

function onPlayerTimeUpdate() {
  player.getCurrentTime().then(seconds => {
    localStorage.setItem('videoplayer-current-time', seconds);
  });
}

function continueToWatch() {
  const timeBeforeUpdate = localStorage.getItem('videoplayer-current-time');
  if (timeBeforeUpdate) {
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
  }
}
