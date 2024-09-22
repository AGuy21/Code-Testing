import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

/**
 * A props type for the VideoGridItem component.
 * @prop { id } - The unique identifier for the video.
 * @prop { channel } - An object containing the channel's id, name, and profile picture URL.
 * @prop { views } - The number of views the video has received.
 * @prop { postedAt } - The date and time when the video was posted.
 * @prop { duration } - The duration of the video in seconds.
 * @prop { thumbnailUrl } - The URL of the video's thumbnail.
 * @prop { videoUrl } - The URL of the video.
 * @type {Object} VideoGridItemProps - Props for the VideoGridItem component.
 */
type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

/**
 * A formatter for the number of views, as it compacts the numbers of views into a more readable format. like "1K", "234K", etc.
 * @type {Intl.NumberFormat} VIEW_FORMATTER - A formatter for the number of views.
 */
const VIEW_FORMATTER: Intl.NumberFormat = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

/**
 * A component that renders a grid item for a video in the VideoGrid component.
 *
 * @param id - The unique identifier for the video.
 * @param title - The title of the video.
 * @param channel - An object containing the channel's id, name, and profile picture URL.
 * @param views - The number of views the video has received.
 * @param postedAt - The date and time when the video was posted.
 * @param duration - The duration of the video in seconds.
 * @param thumbnailUrl - The URL of the video's thumbnail.
 * @param videoUrl - The URL of the video.
 *
 * @returns {JSX.Element} - A JSX element representing the grid item.
 */
const VideoGridItem = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps): JSX.Element => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // whether the video is playing or not
  const videoRef = useRef<HTMLVideoElement>(null); // reference to the video element

  /**
   * useEffect hook to handle video playing/pausing when the mouse enters/leaves the grid item.
   * if the videoRef is null, it will return early.
   * if the video is playing, it will reset the current time to 0 and play the video.
   * when the video is not playing, it will pause the video.
   */
  useEffect(() => {
    if (videoRef.current == null) {
      return;
    }
    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);
  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)} // when the mouse enters the card it will setIsVideoPlaying to true, which will play the video
      onMouseLeave={() => setIsVideoPlaying(false)} // when the mouse leaves the card it will setIsVideoPlaying to false, which will pause the video
    >
      {/*This is the video/image part of the VideoGridItem it will show the thumnail and video duration, when the user hovers the card it will show the video preview aswell */}
      <a href={"/watch?v=" + id} className="relative aspect-video">
        {/*If the video is playing it will transition into sharp cornersn if not it will return to round borders with transition */}

        <img
          src={thumbnailUrl}
          className={
            isVideoPlaying
              ? "block w-full h-full object-cover rounded-none transition-[border-radius] duration-200 delay-200"
              : "block w-full h-full object-cover rounded-xl transition-[border-radius] duration-200 "
          }
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        {/*If the video is playing it will show the video (opacity 100) and if not it will transiton to opacity 0 of the video thus hiding it */}

        <video
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
          className={
            isVideoPlaying
              ? "block h-full object-cover absolute inset-0 transition-opacity duration-200 opacity-100"
              : "block h-full object-cover absolute inset-0 transition-opacity duration-200 opacity-0"
          }
        />
      </a>
      {/*This is the bottom of VideoGridItem showing channel, views, title of video, and when posted */}
      <div className="flex gap-2">
        <a href={"/@" + channel.id} className="flex-shrink-0">
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={"/watch?v=" + id} className="font-bold">
            {title}
          </a>
          <a href={"/@" + channel.id} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;
