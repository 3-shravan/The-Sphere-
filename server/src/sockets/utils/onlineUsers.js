export const onlineUsers = new Map();

/**
 * Add socket to user's list of active sockets
 */
export const addOnlineUser = (userId, socketId, userData) => {
  const id = userId.toString();
  const existing = onlineUsers.get(id);

  if (existing) {
    // add socket id if not already present
    if (!existing.sockets.includes(socketId)) {
      existing.sockets.push(socketId);
    }
  } else {
    onlineUsers.set(id, {
      sockets: [socketId],
      user: userData,
    });
  }
};

/**
 * Remove a socket. If user has no more sockets, remove user entirely.
 */
export const removeOnlineUser = (socketId) => {
  for (let [userId, entry] of onlineUsers.entries()) {
    const updatedSockets = entry.sockets.filter((id) => id !== socketId);

    if (updatedSockets.length !== entry.sockets.length) {
      // socket found and removed
      if (updatedSockets.length === 0) {
        // user is now offline
        onlineUsers.delete(userId);
        return userId;
      }

      // update only sockets
      onlineUsers.set(userId, {
        sockets: updatedSockets,
        user: entry.user,
      });

      return userId;
    }
  }

  return null;
};

/**
 * Get the list of all online users (unique user objects)
 */
export const getOnlineUsersList = () => {
  return Array.from(onlineUsers.values()).map((entry) => entry.user);
};

/**
 * Return a user from online users map
 */
export const getOnlineUser = (userId) => {
  const entry = onlineUsers.get(userId.toString());
  return entry ? entry.user : null;
};

/**
 * Return ALL socket IDs for a user
 */
export const getOnlineUserSocketIds = (userId) => {
  const entry = onlineUsers.get(userId.toString());
  return entry ? entry.sockets : [];
};
