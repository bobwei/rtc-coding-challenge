import { useEffect } from 'react';
import short from 'short-uuid';

export function useRTC({ localStreamElementId, remoteStreamElementId }) {
  // prettier-ignore
  const token = '006366e06fdd4ac43869b3c5c181eb8a1c9IADmZIFk3xkt8VQaxNu3zTWiGnrxYFvmVMSIB9KoSf6FY0eO+aIAAAAAEABqf2ZwXhClXwEAAQBdEKVf';
  const appId = '366e06fdd4ac43869b3c5c181eb8a1c9';
  const channelId = 'channel';
  const uid = short.generate();

  useEffect(() => {
    const p1 = createClient({ appId })
      .then((client) => join({ uid, token, channelId, client }))
      .catch(console.log);
    const p2 = createStream({ uid });
    Promise.all([p1, p2])
      .then(([client, stream]) => {
        stream.play(localStreamElementId);
        client.publish(stream, (err) => console.log(err));
        client.on('stream-added', (e) => {
          if (e.stream.getId() !== uid) {
            client.subscribe(e.stream, (err) => console.log(err));
          }
        });
        client.on('stream-subscribed', (e) => {
          e.stream.play(remoteStreamElementId);
        });
      })
      .catch(console.log);
  }, []);
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

function createStream({ uid }) {
  const AgoraRTC = require('agora-rtc-sdk');
  return new Promise((resolve, reject) => {
    const stream = AgoraRTC.createStream({
      streamID: uid,
      audio: true,
      video: true,
      screen: false,
    });
    stream.init(
      () => resolve(stream),
      (err) => reject(err),
    );
  });
}
