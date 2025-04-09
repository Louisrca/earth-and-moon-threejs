import { useEffect, useRef, useState } from "react";
import styles from "./SettingsModal.module.css";

interface SoundSettings {
  enabled: boolean;
  volume: number;
  ambience: string;
}
export default function SettingsModal() {
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    enabled: false,
    volume: 50,
    ambience: "lofi-space",
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const ambienceOptions = [
    { value: "lofi-space", label: "Space Lofi" },
    { value: "space-ambience", label: "Space Ambience" },
    { value: "astronaut-child-in-space", label: "Astronaut Child" },
    { value: "space-chord", label: "Space Chord" },
    { value: "space-level", label: "Space Level" },
  ];

  const handleSoundToggle = () => {
    setSoundSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setSoundSettings((prev) => ({ ...prev, volume: newVolume }));
  };

  const handleAmbienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSoundSettings((prev) => ({ ...prev, ambience: e.target.value }));
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.volume = soundSettings.volume / 100;

    if (soundSettings.enabled) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log(
            "Autoplay was prevented. Play/pause controls are required:",
            error
          );
        });
      }
    } else {
      audioElement.pause();
    }
  }, [soundSettings.enabled, soundSettings.volume, soundSettings.ambience]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const wasPlaying = !audioElement.paused;

    audioElement.load();

    if (
      wasPlaying &&
      soundSettings.enabled &&
      soundSettings.ambience !== "none"
    ) {
      audioElement.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
  }, [soundSettings.ambience, soundSettings.enabled]);

  return (
    <div className={styles.modal}>
      <section className={styles.title}>
        <h2>Settings</h2>
      </section>

      <section>
        <h4 className={styles.subtitle}>Sound Settings</h4>

        <div className={styles.settingGroup}>
          <div className={styles.settingRow}>
            <label htmlFor="sound-toggle" className={styles.label}>
              Enable Sound
            </label>
            <span className={styles.playButton} onClick={handleSoundToggle}>
              {soundSettings.enabled ? "Pause" : "Play"}
            </span>
          </div>

          <div className={styles.settingRow}>
            <label htmlFor="volume-slider" className={styles.label}>
              Volume:{" "}
              <span className={styles.volumeValue}>{soundSettings.volume}</span>
              %
            </label>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={soundSettings.volume}
              onChange={handleVolumeChange}
              disabled={!soundSettings.enabled}
              className={styles.slider}
            />
          </div>

          <div className={styles.settingRow}>
            <select
              id="ambience-select"
              value={soundSettings.ambience}
              onChange={handleAmbienceChange}
              disabled={!soundSettings.enabled}
              className={styles.select}
            >
              {ambienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <audio ref={audioRef} loop preload="auto">
          {soundSettings.ambience !== "none" && (
            <source
              src={`/sounds/${soundSettings.ambience}.mp3`}
              type="audio/mpeg"
            />
          )}
        </audio>
      </section>
    </div>
  );
}
