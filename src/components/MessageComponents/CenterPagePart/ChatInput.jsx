import React from "react";
import "./ChatInput.scss";
import TextField from "@mui/material/TextField";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Button } from "@mui/material";

const ChatInput = React.memo((props) => {
  const {
    userData,
    createMessage,
    messageText,
    setMessageText,
    conversationToggle,
    conversations,
    socket,
    socketUsersAmount,
  } = props;

  // find receiverId
  const conversation = conversations.find(
    (cnv) => cnv._id === conversationToggle[0]
  );
  const receiverId = conversation?.members.find(
    (user) => user !== userData._id
  );

  const sendMessage = () => {
    // socket message senderFunction
    socket.current?.emit("sendMessage", {
      senderId: userData._id,
      receiverId,
      messageText,
    });

    if (socketUsersAmount.length < 2) {
      createMessage(conversationToggle[0], userData._id, messageText);
    } else if (socketUsersAmount.length >= 2 && conversationToggle[0]) {
      createMessage(
        conversationToggle[0],
        userData._id,
        messageText,
        "don't create message"
      );
    }

    socket.current?.emit("sendNotification", {
      conversationId: conversationToggle[0],
      authorId: userData._id,
      receiverId,
      type: "message",
    });

    setMessageText("");
  };

  const getMessageValue = (e) => {
    setMessageText(e.currentTarget.value);
  };

  return (
    <div className="chatInput_wrapper">
      <div className="text">
        <TextField
          label="Wright your message here..."
          multiline
          maxRows={9}
          minRows={9}
          onChange={getMessageValue}
          value={messageText}
        />
      </div>
      <div className="button">
        <Button
          variant="contained"
          endIcon={<IosShareIcon />}
          onClick={sendMessage}
          disabled={
            conversationToggle.length === 0 ||
            conversationToggle[0] === null ||
            messageText === ""
          }
        >
          Send Message
        </Button>
      </div>
    </div>
  );
});

export default ChatInput;
