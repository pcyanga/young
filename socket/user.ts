import { socketEvent, youngSocket } from "@youngjs/core";
import { Socket } from "socket.io";

export default class userSocket extends youngSocket {
  //选择性重写
  async connected(socket: Socket) {
    console.log("客户端链接", socket.id);
  }
  //选择性重写
  async disconnect(socket: Socket) {
    console.log("客户端断开", socket.id);
  }
  /**
   * 接收信息 socketEvent 表示接受同方法名的事件，此处为接收 data 事件
   * @param msg 信息，多种类型
   * @param socket
   * @param io io对象，可用于广播
   * @returns 回复的信息，不回复就不return,或者return 空信息
   */
  @socketEvent()
  async data(msg: any, socket: Socket, io) {
    console.log(new Date(), msg);
    return msg;
  }
}
