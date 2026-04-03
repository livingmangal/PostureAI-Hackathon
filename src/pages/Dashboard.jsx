import { useState, useMemo } from "react";
import PostureCamera from "../component/PostureCamera";
import ScrollToTop from "../component/ScrollToTop";
import BreakOverlay from "../features/breakReminder/BreakOverlay";
import SettingsPanel from "../features/settings/SettingsPanel";
import { useSettings } from "../features/settings/SettingsContext";
import { useBreakTimer } from "../hooks/useBreakTimer";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function Dashboard() {
  const { settings } = useSettings();

  // ── Lifted state (shared between shortcuts & PostureCamera) ──
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Break timer
  const {
    timeFormatted,
    isBreakTime,
    snooze,
    reset: resetBreak,
  } = useBreakTimer(settings.breakEnabled ? settings.breakInterval * 60 * 1000 : Infinity);

  // ── Keyboard shortcuts — all handlers wired up ──
  const shortcutHandlers = useMemo(
    () => ({
      onToggleMute: () => {
        setIsMuted((m) => {
          const next = !m;
          if (next) window.speechSynthesis.cancel();
          return next;
        });
      },
      onTogglePause: () => setIsPaused((p) => !p),
      onToggleFullscreen: () => setIsFullscreen((f) => !f),
      onEscape: () => {
        setIsFullscreen(false);
        setSettingsOpen(false);
      },
    }),
    [],
  );
  useKeyboardShortcuts(shortcutHandlers);

  return (
    <div className="app-content">
      <ScrollToTop />

      {/* Break overlay */}
      {isBreakTime && settings.breakEnabled && (
        <BreakOverlay onSnooze={snooze} onDismiss={resetBreak} />
      )}

      {/* Settings drawer */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Header */}
      <header className="status-bar">
        <div className="brand">
          <div className="brand-icon">🧠</div>
          <div>
            <div className="brand-name">PostureAI</div>
            <div className="brand-tag">Real-time Analysis</div>
          </div>
        </div>

        <div className="status-indicators">
          <div className="indicator">
            <div className="indicator-dot" />
            {isPaused ? "PAUSED" : "LIVE"}
          </div>
          {settings.breakEnabled && (
            <div className="indicator">⏰ {timeFormatted}</div>
          )}
          <div className="indicator">MODEL · MOVENET</div>
          <button
            className="settings-btn"
            onClick={() => setSettingsOpen(true)}
            title="Settings"
          >
            ⚙️
          </button>
          <div className="version-badge">v2.0</div>
        </div>
      </header>

      {/* Keyboard hint */}
      <div className="keyboard-hints">
        <span>⌨ <b>Space</b> Pause</span>
        <span><b>F</b> Fullscreen</span>
        <span><b>M</b> Mute</span>
        <span><b>Esc</b> Exit</span>
      </div>

      {/* Main */}
      <div className="dashboard-grid">
        <PostureCamera
          isPaused={isPaused}
          isFullscreen={isFullscreen}
          isMuted={isMuted}
          onToggleMute={() => {
            setIsMuted((m) => {
              const next = !m;
              if (next) window.speechSynthesis.cancel();
              return next;
            });
          }}
          onToggleFullscreen={() => setIsFullscreen((f) => !f)}
        />
      </div>
    </div>
  );
}