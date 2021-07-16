export class helper {
  /**
   * 休眠
   * @param ms
   * @returns
   */
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
