"use client";
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { seriesData } from "@/constants/videoDummyData";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const [currentSeason, setCurrentSeason] = useState(seriesData[0]);
  const [currentEpisode, setCurrentEpisode] = useState(
    seriesData[0].episodes[0]
  );

  useEffect(() => {
    if (!playerRef.current) {
      // Initialize the Video.js player
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true
      });

      // Create a custom Playlist Button
      const Button = videojs.getComponent("Button");

      class PlaylistButton extends Button {
        constructor(player: videojs.Player, options: any) {
          super(player, options);
          this.controlText("Playlist");
          this.addClass("vjs-playlist-button");
          this.on("click", () => {
            const playlistContainer = player
              .el()
              .querySelector(".vjs-playlist-container");
            playlistContainer?.classList.toggle("vjs-hidden");
          });
        }
      }

      videojs.registerComponent("PlaylistButton", PlaylistButton);

      playerRef.current
        .getChild("controlBar")
        ?.addChild(
          "PlaylistButton",
          {},
          playerRef.current.controlBar.children().length - 1
        );

      // Add Playlist Container to the Video.js DOM
      const playlistContainer = document.createElement("div");
      playlistContainer.className = "vjs-playlist-container vjs-hidden";
      playlistContainer.style.position = "absolute";
      playlistContainer.style.top = "10%";
      playlistContainer.style.right = "10%";
      playlistContainer.style.width = "300px";
      playlistContainer.style.maxHeight = "50%";
      playlistContainer.style.overflowY = "auto";
      playlistContainer.style.background = "#333";
      playlistContainer.style.color = "#fff";
      playlistContainer.style.padding = "10px";
      playlistContainer.style.borderRadius = "5px";
      playlistContainer.style.zIndex = "1000";

      playerRef.current.el().appendChild(playlistContainer);

      // Render the Playlist
      const renderPlaylist = () => {
        if (!playlistContainer) return;

        playlistContainer.innerHTML = `
          <h4 style="margin: 10px 0; font-size: 16px;">Seasons</h4>
          <select id="season-select" style="width: 100%; margin-bottom: 15px; padding: 5px; border-radius: 3px;">
            ${seriesData
              .map(
                (season, index) => `
                  <option value="${index}">${season.title}</option>
                `
              )
              .join("")}
          </select>
          <div id="episode-list">
            ${currentSeason.episodes
              .map(
                (episode) => `
                <div class="episode-item" data-episode-id="${episode.id}" style="margin: 10px 0; cursor: pointer; padding: 5px; border-bottom: 1px solid #444;">
                  <strong>${episode.title}</strong>
                  <p style="margin: 5px 0;">${episode.description}</p>
                </div>
              `
              )
              .join("")}
          </div>
        `;

        // Add Event Listeners for Season and Episode Changes
        const seasonSelect = playlistContainer.querySelector("#season-select");
        const episodeList = playlistContainer.querySelector("#episode-list");

        seasonSelect?.addEventListener("change", (e) => {
          const selectedSeason = seriesData[+e.target.value];
          setCurrentSeason(selectedSeason);
          setCurrentEpisode(selectedSeason.episodes[0]);
        });

        episodeList?.querySelectorAll(".episode-item").forEach((item) => {
          item.addEventListener("click", (e) => {
            const episodeId = (e.currentTarget as HTMLElement).dataset
              .episodeId;
            const selectedEpisode = currentSeason.episodes.find(
              (ep) => ep.id === Number(episodeId)
            );
            if (selectedEpisode) setCurrentEpisode(selectedEpisode);
          });
        });
      };

      renderPlaylist();
    }

    // Set initial video source
    playerRef.current?.src({
      src: currentEpisode.url,
      type: "application/x-mpegURL"
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [currentEpisode, currentSeason]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default VideoPlayer;
