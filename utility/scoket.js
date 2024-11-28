// const { Socket } = require("socket.io");
const Models = require("../models");
const moment = require("moment");
const helper = require("../helpers/helper");
const { Op, Sequelize, where } = require("sequelize");
const db = require("../models");
const { raw } = require("mysql2");


module.exports = function (io) {
  console.log("Inside the socket");
  io.on("connection", (socket) => {
    console.log("connected user", socket.id);
    //or if it is false that mean's it is http(not scure).
    console.log("socket.handshake.secure", socket.handshake.secure);
    //This return IP with port
    console.log("socket.handshake.headers.host", socket.handshake.headers.host);
    // console.log("socket",socket)
    //Connect the user  //Test pass
    socket.on("connect_user", async function (data) {
      try {
        console.log("data", data);
        if (!data.userId) {
          error_message = {
            error_message: "please enter user id first",
          };
          socket.emit("connect_user_listener", error_message);
          return;
        }
        const socketId = socket.id;
        const checkUser = await db.socket_users.findOne({
          where: {
            userId: data.userId,
          },
        });
        if (checkUser) {
          await db.socket_users.update(
            { isOnline: 1, socketId: socketId },
            {
              where: { userId: data.userId },
            }
          );
        } else {
          await db.socket_users.create({
            userId: data.userId,
            socketId: socketId,
            isOnline: 1,
          });
        }

        let success_msg = {
          success_msg: "connected successfully",
        };
        socket.emit("connect_user_listener", success_msg);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
    //Test pass
    //On click user seen the all message of user one to one after click on user then seen all chat of one user //Test pass
    socket.on("users_chat_list", async (get_data) => {
      try {
        const findConstant = await db.chat_constant.findOne({
          where: {
            [Op.or]: [
              {
                senderId: get_data.senderId,
                receiverId: get_data.receiverId,
              },
              {
                senderId: get_data.receiverId,
                receiverId: get_data.senderId,
              },
            ],
          },
          include: [
            {
              model: db.userModel,
              as: "sender",
              attributes: [
                "id",

                "firstName",
                "lastName",
                "image",
                "email",
              ],
            },
            {
              model: db.userModel,
              as: "receiver",
              attributes: [
                "id",

                "firstName",
                "lastName",
                "image",
                "email",
              ],
            },
          ],
        });

        if (findConstant) {
          console.log("get_data", get_data);
          let c = await db.messages.update(
            { readStatus: 1 }, 
            {
              where: {
                senderId: get_data.senderId,
                receiverId: get_data.receiverId,
                readStatus: 0, 
              },
            }
          );
          console.log("this is update test", c);
          const chatList = await db.messages.findAll({
            where: {
              [Op.and]: [
                {
                  [Op.or]: [
                    {
                      senderId: get_data.senderId,
                      receiverId: get_data.receiverId,
                    },
                    {
                      receiverId: get_data.senderId,
                      senderId: get_data.receiverId,
                    },
                    { chatConstantId: findConstant.id },
                  ],
                },
                {
                  deletedId: { [Op.ne]: get_data.senderId },
                },
              ],
            },
            include: [
              {
                model: db.userModel,
                as: "sender",
                attributes: ["firstName", "lastName", "image"],
              },
              {
                model: db.userModel,
                as: "receiver",
                attributes: ["firstName", "lastName", "image"],
              },
            ],
          });
          // Populate receiver's profile image;
          const count = await db.messages.count({
            where: {
              [Op.and]: [
                {
                  [Op.or]: [
                    {
                      [Op.and]: [
                        { senderId: get_data.senderId },
                        { receiverId: get_data.receiverId },
                      ],
                    },
                    {
                      [Op.and]: [
                        { receiverId: get_data.senderId },
                        { senderId: get_data.receiverId },
                      ],
                    },
                    { chatConstantId: findConstant.id },
                  ],
                },
                {
                  [Op.and]: [
                    { deletedId: { [Op.ne]: get_data.senderId } },
                    { readStatus: 0 },
                  ],
                },
              ],
            },
          });

          let iBlockedHim = await db.blockModel.findOne({
            where: {
              blockBy: get_data.senderId,
              blockTo: get_data.receiverId
            }
          })
          console.log("iBlockedHim", iBlockedHim)
          let heBlockedMe = await db.blockModel.findOne({
            where: {
              blockTo: get_data.senderId,
              blockBy: get_data.receiverId
            }
          })
          const success_message = {
            success_message: "Users Chats",
            code: 200,
            senderDetail: findConstant,
            unread_message_count: count,
            iBlockedHim: iBlockedHim ? 1 : 0,
            heBlockedMe: heBlockedMe ? 1 : 0,
            getdata: chatList.map((message) => {
              const isMessageFromSender = message.senderId == get_data.senderId;

              return {
                id: message.id,
                senderId: message.senderId,
                receiverId: message.receiverId,
                chatConstantId: message.chatConstantId,
                message: message.message,
                readStatus: message.readStatus,
                messageType: message.messageType,
                message: message.message,
                thumbnail: message.thumbnail,
                deletedId: message.deletedId,
                image: message.image,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
                messageside: isMessageFromSender ? "sender" : "other",

              };
            }),
          };

          socket.emit("users_chat_list_listener", success_message);
        } else {
          const success_message = {
            error: "Users Chat not found",
            code: 403,
          };
          socket.emit("users_chat_list_listener", success_message);
        }
      } catch (error) {
        throw error;
      }
    });
    //Test pass
    //List of all user with whom sender-User do chat with online status
    socket.on("user_constant_list", async (get_data) => {
      try {
        const { filter, senderId } = get_data;
        // Build the query to find chat constants
        const where = {
          [Op.or]: [{ senderId: senderId }, { receiverId: senderId }],
        };
        // Find all chat constants that match the criteria
        const constantList = await db.chat_constant.findAll({
          where: where,
          attributes: [
            "id",
            "senderId",
            "receiverId",
            "unreadCount",
            "createdAt",
            "updatedAt",
            "onlineStatus",
            [
              Sequelize.literal(`(
                SELECT IFNULL((
                  SELECT 1 FROM blockModel 
                  WHERE 
                    blockBy = ${senderId} AND blockTo = chat_constant.receiverId
                  LIMIT 1
                ), 0)
              )`),
              'iBlockHim'
            ],
            [
              Sequelize.literal(`(
                SELECT IFNULL((
                  SELECT 1 FROM blockModel 
                  WHERE 
                    blockTo = ${senderId} AND blockBy = chat_constant.receiverId
                  LIMIT 1
                ), 0)
              )`),
              'heBlockMe'
            ]

          ],

          include: [
            {
              model: db.messages,
              as: "lastMessageIds",
              attributes: ["message", "messageType"],
            },
            {
              model: db.userModel,
              as: "sender",
              attributes: [
                "id",
                "firstName",
                "lastName",
                "image",
                "email",
              ],
            },
            {
              model: db.userModel,
              as: "receiver",
              attributes: [
                "id",
                "firstName",
                "lastName",
                "image",
                "email",
              ],
            },
          ],
          order: [["updatedAt", "DESC"]],
        });

        // Create an array to store user IDs for whom we want to count unread message
        const userIds = constantList.map((constant) => {
          if (constant.senderId && constant.senderId == senderId) {
            return constant.receiverId != null ? constant.receiverId : null;
          } else {
            return constant.senderId != null ? constant.senderId : null;
          }
        });
        // Initialize an empty object to store unread message counts
        const unreadMessageCounts = {};
        // Loop through each user ID and count unread message

        for (const userId of userIds) {
          const count = await db.messages.count({
            where: {
              [Op.and]: {
                [Op.or]: [
                  // { senderId: senderId ,receiverId: userId},
                  { senderId: userId, receiverId: senderId },
                ],
                readStatus: 0,
              },
            },
          });
          unreadMessageCounts[userId] = count;
          console.log(
            " unreadMessageCounts[userId]",
            (unreadMessageCounts[userId] = count)
          );
        }

        const allSocketUsers = await db.socket_users.findAll({
          where: {
            userId: {
              [Op.ne]: get_data.senderId, // Exclude the get_data.senderId
            },
          },
        });

        // Create an object to map user IDs to their online status
        const onlineStatusMap = {};
        allSocketUsers.forEach((user) => {
          onlineStatusMap[user.userId] = user.isOnline == 1; // Set isOnline based on the value
        });
        const uniqueGetdata = constantList.filter((value, index, self) => {
          // Find the index of the first occurrence of the same senderId and receiverId
          const firstIndex = self.findIndex(
            (item) =>
              item.senderId === value.senderId &&
              item.receiverId === value.receiverId
          );
          // Keep only the first occurrence
          return index === firstIndex;
        });

        // Add unread message counts to the constantList
        uniqueGetdata.forEach((constant) => {
          const senderId = constant.senderId;
          const receiverId = constant.receiverId;
          // Determine the user ID for whom you want to count unread message
          const userId = senderId == get_data.senderId ? receiverId : senderId;
          // Check if the user ID is valid and exists in unreadMessageCounts
          if (userId !== null && unreadMessageCounts[userId] !== undefined) {
            // Add the unreadCount property to the object
            constant.unreadCount = unreadMessageCounts[userId];
          } else {
            // Handle the case where unreadMessageCounts doesn't have data for this user
            constant.unreadCount = 0;
          }
          if (userId !== null && onlineStatusMap[userId]) {
            constant.onlineStatus = true; // User is online
          } else {
            constant.onlineStatus = false; // User is offline
          }
          if (
            constant.deletedId == get_data.senderId &&
            constant.deletedLastMessageId != 0
          ) {
            constant.lastMessageId = "";
            constant.lastMessageIds
              ? (constant.lastMessageIds.message = "")
              : "";
          }
        });

        const success_message = {
          success_message: "User Constant Chats List with Unread Message Count",
          code: 200,
          getdata: uniqueGetdata,
        };

        socket.emit("user_constant_chat_list", success_message);
      } catch (error) {
        throw error;
      }
    });

    //Disconnect the user //Test pass
    socket.on("disconnect_user", async (connect_listener) => {
      try {
        const socketid = socket.id;
        const check_user = await db.socket_users.findOne({
          where: {
            userId: connect_listener.userId, // The condition to find the socket user with a specific userId
          },
        });
        if (check_user) {
          await db.socket_users.update(
            { isOnline: 0 }, // Values to update
            {
              where: {
                userId: connect_listener.userId, // Your condition for updating
              },
            }
          );
        }
        const success_message = {
          success_message: "Disconnect successfully",
          socketid,
        };
        socket.emit("disconnect_listener", success_message);
      } catch (error) {
        throw error;
      }
    });
    //When user close the tab or app or when the server is shutdown so auto disconnet the user on server side
    socket.on("disconnect", async function () {
      try {
        await db.socket_users.update(
          {
            isOnline: 0,
          },
          {
            where: {
              socketId: socket.id,
            },
          }
        );
      } catch (error) {
        return error;
      }
    });
    //Message read and unread //Test pass
    socket.on("read_unread", async function (get_read_status) {
      try {
        await db.messages.update(
          { readStatus: 1 }, // Values to update
          {
            where: {
              [Op.or]: [
                {
                  senderId: get_read_status.senderId,
                  receiverId: get_read_status.receiverId,
                  readStatus: 0,
                },
                {
                  senderId: get_read_status.receiverId,
                  receiverId: get_read_status.senderId,
                  readStatus: 0,
                },
              ],
            },
          }
        );
        const senderDetail = await db.socket_users.findOne({
          where: { userId: get_read_status.senderId },
        });
        const receiverDetail = await db.socket_users.findOne({
          where: { userId: get_read_status.receiverId },
        });

        const get_read_unread = { readStatus: 1 };
        io.to(senderDetail.socketId).emit(
          "read_unread_listner",
          get_read_status
        );
        io.to(receiverDetail.socketId).emit(
          "read_unread_listner",
          get_read_status
        );
        // socket.emit("read_unread_listner", get_read_status);
      } catch (error) {
        throw error;
      }
    });
    //Delete the message //test pass
    socket.on("delete_message", async (get_data) => {
      try {
        console.log("getdata", get_data);
        var deleteMessage;
        if (Array.isArray(get_data.id)) {
          deleteMessage = await db.messages.destroy({
            where: {
              id: get_data.messageId, // Replace with the actual field name for the message ID
            },
          });
          //Find last message
          let lastMessageIds = await db.chat_constant.findOne({
            where: {
              [Op.or]: [
                {
                  senderId: get_data.senderId,
                  lastMessageId: get_data.messageId,
                },
                {
                  receiverId: get_data.senderId,
                  lastMessageId: get_data.messageId,
                },
              ],
            },
          });
          if (lastMessageIds) {
            //Then find last message
            const data = await db.messages.findOne({
              where: {
                [Op.or]: [
                  {
                    senderId: lastMessageIds.senderId,
                    receiverId: lastMessageIds.receiverId,
                  },
                  {
                    senderId: lastMessageIds.receiverId,
                    receiverId: lastMessageIds.senderId,
                  },
                ],
              },
              order: [["createdAt", "DESC"]], // Sorting by the 'createdAt' field in descending order
            });
            //Then store last message in chatConstant
            await db.chat_constant.update(
              { lastMessageId: data?.dataValues.id },
              {
                where: {
                  id: lastMessageIds?.dataValues.id,
                },
              }
            );
          }
          // Send success response to the client
          const success_message = {
            success_message: "Message deleted successfully",
          };
          socket.emit("delete_message_listener", success_message);
        } else {
          // It's a single ID
          const deleteMessage = await db.messages.destroy({
            where: {
              id: get_data.messageId, // Replace with the actual field name for the message ID
            },
          });
          //Find last message
          let lastMessageIds = await db.chat_constant.findOne({
            where: {
              [Op.or]: [
                {
                  senderId: get_data.senderId,
                  lastMessageId: get_data.messageId,
                },
                {
                  receiverId: get_data.senderId,
                  lastMessageId: get_data.messageId,
                },
              ],
            },
          });

          if (lastMessageIds) {
            //Then find last message
            const data = await db.messages.findOne({
              where: {
                [Op.or]: [
                  {
                    senderId: lastMessageIds.senderId,
                    receiverId: lastMessageIds.receiverId,
                  },
                  {
                    senderId: lastMessageIds.receiverId,
                    receiverId: lastMessageIds.senderId,
                  },
                ],
              },
              order: [["createdAt", "DESC"]], // Sorting by the 'createdAt' field in descending order
            });

            //Then store last message in chatConstant
            await db.chat_constant.update(
              { lastMessageId: data.dataValues.id },
              {
                where: {
                  id: lastMessageIds.dataValues.id,
                },
              }
            );
          }
        }
        // Send success response to the client
        const success_message = {
          success_message: "Message deleted successfully",
        };
        socket.emit("delete_message_listener", success_message);
      } catch (error) {
        throw error;
      }
    });

    //Message send //Test pass
    socket.on("send_message", async function (data) {
      try {
        // Check if a chat constant exists for these users
        console.log("data", data);

        const checkChatConstant = await db.chat_constant.findOne({
          where: {
            [Op.or]: [
              {
                senderId: data.senderId,
                receiverId: data.receiverId,
              },
              {
                senderId: data.receiverId,
                receiverId: data.senderId,
              },
            ],
          },
        });

        if (checkChatConstant) {
          // Create a new message and associate it with the chat constant
          const saveMsg = await db.messages.create({
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: data.message,
            messageType: data.messageType,
            chatConstantId: checkChatConstant.id,
            thumbnail:
              data.messageType == 2 || data.messageType == 3
                ? data.thumbnail
                : "",
          });
          // Update the last message ID in the chat constant
          let updatedata = await db.chat_constant.update(
            {
              lastMessageId: saveMsg.id,
              deletedLastMessageId: 0,
            },
            {
              where: {
                id: checkChatConstant.id,
              },
            }
          );

          const getMsg = await db.messages.findOne({
            include: [
              {
                model: db.userModel,
                as: "sender",
                // attributes: ['id', 'name', 'image'],
              },
              {
                model: db.userModel,
                as: "receiver",
                // attributes: ['id', 'name', 'image'],
              },
            ],
            where: {
              senderId: saveMsg.senderId,
              receiverId: saveMsg.receiverId,
              id: saveMsg.id,
            },
          });

          if (getMsg) {
            const getMsgs = getMsg;
            const getSocketId = await db.socket_users.findOne({
              where: {
                userId: data.receiverId,
              },
            });
            if (getSocketId) {
              io.to(getSocketId.socketId).emit("send_message_emit", getMsgs);
            };
            const user = await db.userModel.findOne({
              where: {
                id: data.receiverId,
              },
            });
            if (
              user &&
              user.deviceToken
            ) {
              let body = {
                deviceToken: user.deviceToken,
                deviceType: (user.deviceType).toString(),
                message: getMsg.message,
                notificationType: (2).toString(),
                senderDetail: getMsg.sender.toString(),
                senderId: (getMsg.sender.id).toString(),
                firstName: getMsg.sender.firstname,
                lastName: getMsg.sender.lastname,
                image: getMsg.sender.image,
                receiverId: (getMsg.receiver.id).toString(),
                messageType: (getMsg.messageType).toString(),
                data: data,
              };
              await helper.sendPushNotification(body);
            }
            // Emit the message to the sender's socket
            socket.emit("send_message_emit", getMsgs);
          }
        } else {
          // Create a new chat constant
          const createChatConstant = await db.chat_constant.create({
            senderId: data.senderId,
            receiverId: data.receiverId,
            lastMessageId: null
          });
          // Create a new message and associate it with the chat constant
          const saveMsg = await db.messages.create({
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: data.message,
            messageType: data.messageType,
            chatConstantId: createChatConstant.id,
            thumbnail:
              data.messageType == 2 || data.messageType == 3
                ? data.thumbnail
                : "",
          });

          // Update the last message ID in the chat constant
          await db.chat_constant.update(
            {
              lastMessageId: saveMsg.id,
              deletedLastMessageId: 0,
            },
            {
              where: {
                id: createChatConstant.id,
              },
            }
          );

          // Retrieve the message and sender/receiver information
          const getMsg = await db.messages.findOne({
            where: {
              senderId: saveMsg.senderId,
              receiverId: saveMsg.receiverId,
              id: saveMsg.id,
            },
            include: [
              {
                model: db.userModel,
                as: "sender",
                // attributes: ['id', 'name', 'image'],
              },
              {
                model: db.userModel,
                as: "receiver",
                // attributes: ['id', 'name', 'image'],
              },

            ],
          });

          if (getMsg) {
            const getMsgs = getMsg;
            const getSocketId = await db.socket_users.findOne({
              where: {
                userId: data.receiverId,
              },
            });

            if (getSocketId) {
              io.to(getSocketId.socketId).emit("send_message_emit", getMsgs);
            }

            // Send push notification to the receiver if available
            const user = await db.userModel.findOne({
              where: {
                id: data.receiverId,
              },
            });

            if (
              user &&
              user.deviceToken
            ) {
              const deviceToken = user.deviceToken;
              const deviceType = user.deviceType;

              let body = {
                deviceToken: user.deviceToken,
                deviceType: (user.deviceType).toString(),
                message: getMsg.message,
                notificationType: (1).toString(),
                senderDetail: getMsg.sender,
                notificationType: (2).toString(),
                senderId: (getMsg.sender.id).toString(),
                firstName: getMsg.sender.firstname,
                lastName: getMsg.sender.lastname,
                image: getMsg.sender.image,
                receiverId: (getMsg.receiver.id).toString(),
                messageType: (getMsg.messageType).toString(),
                data: data,
              };
              await helper.sendPushNotification(body);
            }
            socket.emit("send_message_emit", getMsgs);
          }
        }
      } catch (error) {
        throw error;
      }
    });

    socket.on("clear_chat", async (get_data) => {
      try {
        // Find all message to be cleared
        const getmessage = await db.messages.findAll({
          where: {
            [Op.or]: [
              {
                senderId: get_data.receiverId,
                receiverId: get_data.senderId,
              },
              {
                senderId: get_data.senderId,
                receiverId: get_data.receiverId,
              },
            ],
            deletedId: {
              [Op.not]: 0, // Select message with a non-null deletedId
            },
          },
        });

        if (getmessage && getmessage.length > 0) {
          // Delete message permanently if they have a non-null deletedId
          await db.messages.destroy({
            where: {
              [Op.or]: [
                {
                  senderId: get_data.receiverId,
                  receiverId: get_data.senderId,
                },
                {
                  senderId: get_data.senderId,
                  receiverId: get_data.receiverId,
                },
              ],
              deletedId: {
                [Op.not]: 0, // Select message with a non-null deletedId
              },
            },
          });
          await db.chat_constant.update(
            { deletedId: get_data.senderId, deletedLastMessageId: 1 },
            {
              where: {
                [Op.or]: [
                  {
                    senderId: get_data.receiverId,
                    receiverId: get_data.senderId,
                  },
                  {
                    senderId: get_data.senderId,
                    receiverId: get_data.receiverId,
                  },
                ],
              },
            }
          );
        } else {
          // Update or add new message with the current sender's deletedId
          await db.messages.update(
            { deletedId: get_data.senderId },
            {
              where: {
                [Op.or]: [
                  {
                    senderId: get_data.receiverId,
                    receiverId: get_data.senderId,
                  },
                  {
                    senderId: get_data.senderId,
                    receiverId: get_data.receiverId,
                  },
                ],
                deletedId: {
                  [Op.eq]: 0, // Select message with a null deletedId
                },
              },
            }
          );
          await db.chat_constant.update(
            { deletedId: get_data.senderId, deletedLastMessageId: 1 },
            {
              where: {
                [Op.or]: [
                  {
                    senderId: get_data.receiverId,
                    receiverId: get_data.senderId,
                  },
                  {
                    senderId: get_data.senderId,
                    receiverId: get_data.receiverId,
                  },
                ],
              },
            }
          );
        }

        // Send success response to the client
        const success_message = {
          success_message: "message cleared successfully",
        };
        socket.emit("clear_chat_listener", success_message);
      } catch (error) {
        console.error("Error clearing chat:", error);
        // Handle the error here or rethrow it if you want to propagate it further
        throw error;
      }
    });
    //Typing and stopTyping  get_data has senderId and receiverId
    socket.on("typing", async (data) => {
      try {
        const { senderId, receiverId } = data;
        const getSocketId = await db.socket_users.findOne({
          where: {
            userId: data.receiverId,
          },
        });
        // Broadcast typing event to the receiver
        io.to(getSocketId.socketId).emit("typing", senderId);
      } catch (error) {
        throw error;
      }
    });
    // Listen for stopTyping event
    socket.on("stopTyping", async (data) => {
      try {
        const { senderId, receiverId } = data;
        const getSocketId = await db.socket_users.findOne({
          where: {
            userId: data.receiverId,
          },
        });
        // Broadcast stopTyping event to the receiver
        io.to(getSocketId.socketId).emit("stopTyping", senderId);
      } catch (error) {
        throw error;
      }
    });

    socket.on('blockUser', async (data) => {
      try {
        const { blockBy, blockTo } = data;
        let status;
        let checkExist = await db.blockModel.findOne({ where: { blockBy, blockTo } });
        if (!checkExist) {
          let objToSave = {
            blockBy: blockBy,
            blockTo: blockTo,
            isBlock: 1
          };
          await db.blockModel.create(objToSave);
          status = 'blocked';
        } else {
          await db.blockModel.destroy({ where: { blockBy, blockTo } });
          status = 'unblocked';
        }
        const getSocketId = await db.socket_users.findOne({
          where: {
            userId: blockTo,
          },
        });

        if (getSocketId) {
          let msg = { message: `User ${status} successfully`, }
          io.to(getSocketId.socketId).emit("userBlockedSocket", msg);
        }

        socket.emit('userBlocked', {
          message: `User ${status} successfully`,
        });
      } catch (error) {
        console.log(error);
        socket.emit('error', { message: error.message });
      }
    });
  });
};

// Backend listerner - emmiter ===1.(connect_user,connect_user_listener (send keys -- userId)), for connect user. 2.(users_chat_list,users_chat_list_listener (send key to backend--- senderId,receiverId)), for seen single user all messsage
// 3.(user_constant_list,user_constant_chat_list (send Key to backend----senderId)),List of all user with whom sender-User do chat. 4(disconnect_user,disconnect_listener (send Key to backend----senderId)),for discount the user
// 5.(read_unread,read_data_status) for read or unread the message. 6 .(delete_message,delete_message_listener) delete permanetly message
// 7.(send_message,send_message_emit,(send Key to backend----senderId,receiverId,message,message_type)) for send the message. 8.(clear_chat,clear_chat_listener) for clear the chat senderId and receiverId. 9.(block_user,block_user_listener) for block the user
// 10.(typing,typing) for typing. 11.(stopTyping,stopTyping) for stop typing.
// soket emit and listner





// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const flash = require("express-flash");
const fileupload = require("express-fileupload");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dotenv = require("dotenv");
// const { elements } = require("chart.js");
// const { x } = require("tar");
dotenv.config();
var app = express();
app.get("/test", async (req, res) => {
  res.json("hlo")
})
const http = require("http").Server(app);
const io = require("socket.io")(http);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(
  session({
    secret: "keyboard cat",
    cookie: { secure: false },
  })
);
app.use("/user", usersRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
require("./socket/socket")(io);
const port = process.env.Port;
http.listen(port, function () {
  console.log(`Node app is running on port ${port}`);
});
module.exports = app;