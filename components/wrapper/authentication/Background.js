import Card from "../../UI/Card";

const style = {
  objectFit: "cover",
  minWidth: "100%",
  display: "inline",
  position: "fixed",
  right: "0",
  bottom: "0",
  zIndex: "-1",
};

const BackGroundVideo = () => {
  return (
    <>
      <video autoPlay loop style={style} muted disableRemotePlayback>
        <source
          src="https://video-public.canva.com/VAFGWxITitg/v/6ed83b1b77.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default BackGroundVideo;
