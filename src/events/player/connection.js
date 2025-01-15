const networkStateChangeHandler = (newNetworkState) => {
  const newUdp = Reflect.get(newNetworkState, "udp");

  clearInterval(newUdp?.keepAliveInterval);
};

module.exports = {
  name: "connection",
  isPlayerEvent: true,

  async execute(queue) {
    if (queue.metadata.channel?.id !== queue.connection.joinConfig.channelId)
      return queue.delete();

    queue.connection.on("stateChange", (oldState, newState) => {
      const oldNetworking = Reflect.get(oldState, "networking");
      const newNetworking = Reflect.get(newState, "networking");

      oldNetworking?.off("stateChange", networkStateChangeHandler);
      newNetworking?.on("stateChange", networkStateChangeHandler);
    });
  },
};
