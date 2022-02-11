import { youngSocket } from "young-core";
import { Socket } from "socket.io";

export default class userSocket extends youngSocket {
  async connected(socket: Socket) {
    console.log("客户端链接", socket.id);
  }
  async disconnect(socket: Socket) {
    console.log("客户端断开", socket.id);
  }
  /**
   * 接收信息
   * @param msg 信息，多种类型
   * @param socket
   * @param io io对象，可用于广播
   * @returns 回复的信息，不回复就不return,或者return 空信息
   */
  async data(msg: any, socket: Socket, io) {
    console.log(new Date(), msg);
    return msg;
  }
}
