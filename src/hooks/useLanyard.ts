import { useState, useEffect } from 'react';

const LANYARD_WS_URL = 'wss://api.lanyard.rest/socket';
const DISCORD_ID = '902241075316535366';

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    bot: boolean;
    global_name: string;
  };
  activities: {
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    application_id?: string;
    timestamps?: { start?: number; end?: number };
    assets?: { large_image?: string; large_text?: string; small_image?: string; small_text?: string };
  }[];
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

export function useLanyard() {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: NodeJS.Timeout;
    let isConnected = false;

    const connect = () => {
      ws = new WebSocket(LANYARD_WS_URL);

      ws.onmessage = (event) => {
        const { op, d, t } = JSON.parse(event.data);

        if (op === 1) {
          // Hello, setup heartbeat
          heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, d.heartbeat_interval);

          // Subscribe to user
          ws.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: DISCORD_ID },
            })
          );
          isConnected = true;
        } else if (op === 0) {
          if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
            // For INIT_STATE, Lanyard wraps the data in a key matching the Discord ID if using subscribe_to_ids.
            // But with subscribe_to_id, the data is directly in `d`.
            setData(d[DISCORD_ID] || d);
          }
        }
      };

      ws.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        isConnected = false;
        // Reconnect after 3 seconds
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (ws) ws.close();
    };
  }, []);

  return data;
}
