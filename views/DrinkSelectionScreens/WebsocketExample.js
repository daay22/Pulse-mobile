import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const WebSocketExample = () => {
  const [messages, setMessages] = useState([]);
  const socket = new WebSocket('ws://example.com/socket');

  useEffect(() => {
    // WebSocket connection opened
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
    });

    // WebSocket message event
    socket.addEventListener('message', (event) => {
      const newMessages = [...messages, event.data];
      setMessages(newMessages);
    });

    // WebSocket close event
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, [messages]);

  const sendMessage = () => {
    const message = 'Hello, WebSocket!';
    socket.send(message);
  };

  return (
    <View>
      <Text>WebSocket Messages:</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
};

export default WebSocketExample;
