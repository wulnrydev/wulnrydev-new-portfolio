export interface Track {
  title: string;
  artist: string;
  src: string;
  /** Playback starts here the first time the user presses play (02:55). */
  startTime: number;
  /** Volume starts fading out at this second (03:32). */
  fadeOutStart: number;
  /** Fade-out reaches silence here. */
  fadeOutEnd: number;
}

export interface LyricLine {
  /** Time in seconds from the start of the audio file. */
  time: number;
  text: string;
  /** Visually emphasised line (the hook). */
  emphasis?: boolean;
}

export const TRACK: Track = {
  title: "Love Me Not",
  artist: "Ravyn Lenae",
  src: "/Ravyn Lenae - Love Me Not (Official Music Video).mp3",
  startTime: 175,
  fadeOutStart: 212,
  fadeOutEnd: 218.5,
};

export const LYRICS: LyricLine[] = [
  {
    time: 175,
    text: "You gotta say that you're sorry at the end of the night",
    emphasis: true,
  },
  { time: 180, text: "Wake up in the morning, everything's alright" },
  { time: 184, text: "At the end of the story, you're holdin' me tight" },
  { time: 188, text: "I don't need to worry, am I out of my mind?" },
  {
    time: 191,
    text: "And, oh, it's hard to see you, but I wish you were right here (I'm losing my mind)",
  },
  { time: 195, text: "Oh, it's hard to leave you when I get you everywhere" },
  { time: 200, text: "All this time I'm thinking, I'm strong enough to sink it" },
  { time: 204, text: "Oh, no, I don't need you, but I miss you, come here" },
];
