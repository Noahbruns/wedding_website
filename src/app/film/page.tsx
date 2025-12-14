import Video from "next-video";
import film from "/videos/film.mp4";

export default function page() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black">
      <Video src={film} />;
    </div>
  );
}
