import { useEffect } from 'react';
import short from 'short-uuid';

export function useRTC() {
  // prettier-ignore
  const token = '006366e06fdd4ac43869b3c5c181eb8a1c9IADmZIFk3xkt8VQaxNu3zTWiGnrxYFvmVMSIB9KoSf6FY0eO+aIAAAAAEABqf2ZwXhClXwEAAQBdEKVf';
  const appId = '366e06fdd4ac43869b3c5c181eb8a1c9';
  const channelId = 'channel';
  const uid = short.generate();

  useEffect(() => {
    const p1 = createClient({ appId })
      .then((client) => join({ uid, token, channelId, client }))
      .catch(console.log);
    Promise.all([p1]);
  }, []);
  return {};
}

function createClient({ appId }) {
  const AgoraRTC = require('agora-rtc-sdk');
  return new Promise((resolve, reject) => {
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
    client.init(
      appId,
      () => {
        resolve(client);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

function join({ uid, token, channelId, client }) {
  return new Promise((resolve, reject) => {
    client.join(
      token,
      channelId,
      uid,
      () => resolve(client),
      (err) => reject(err),
    );
  });
}
