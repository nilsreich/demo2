import type * as Party from "partykit/server";

export default class ChatRoom implements Party.Server {
  constructor(readonly room: Party.Party) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Begrüßungsnachricht senden
    conn.send(JSON.stringify({
      id: Date.now(),
      text: `Willkommen im Chat, ${conn.id}!`,
      sender: 'System'
    }));
  }

  onMessage(message: string, sender: Party.Connection) {
    // Nachricht an alle Clients senden, außer an den Sender
    this.room.broadcast(message, [sender.id]);
  }
}