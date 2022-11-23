import React from "react";


function VideoPlayer({public_id}) {


  return (
    <iframe
      src={`https://player.cloudinary.com/embed/?public_id=${public_id}&cloud_name=dxxqabghy&player[fluid]=true&player[controls]=true&player[skin]=light&player[colors][accent]=%23f87171&player[colors][text]=%23f87171&player[logoOnclickUrl]=https%3A%2F%2Fpf-henry-grupo05.vercel.app&player[logoImageUrl]=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_25%2Fhttps%3A%2F%2Fi.pinimg.com%2Foriginals%2F00%2F65%2Fee%2F0065ee133294c73fe29dbab81dc6acc9.png&source[sourceTypes][0]=mp4`}
      width="auto"
      height="420"
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowfullscreen
      frameborder="0"
      className="mx-auto w-full"
    ></iframe>
  );
}

export default VideoPlayer;
