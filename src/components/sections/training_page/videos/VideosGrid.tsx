import { videos } from "../../../../data/videos";
import VideoCard from "./VideoCard";

const VideosGrid = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} index={index} />
      ))}
    </div>
  );
};

export default VideosGrid;
