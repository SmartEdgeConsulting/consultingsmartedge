import Pusher from 'pusher-js';

let pusherClient: Pusher | null = null;

export function getPusherClient() {
  if (!pusherClient) {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1';
    
    if (!key) {
      console.error('Pusher key is missing');
      return null;
    }
    
    pusherClient = new Pusher(key, {
      cluster: cluster,
    });
    
    console.log('Pusher client initialized');
  }
  return pusherClient;
}