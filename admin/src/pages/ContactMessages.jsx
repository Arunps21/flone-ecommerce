import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const ContactMessages = ({ token }) => {
  const [msg, setMsg] = useState([]);

  const getMsg = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/contact/getmessage`, {
        headers: { token },
      });
      if (data.success == true) {
        setMsg(data.contactMessages);
      } else {
        setMsg([]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getMsg();
  }, [msg]);

  return (
    <>
      <p className="mb-4">Contact Messages</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_1fr_3fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Email</b>
          <b>Message</b>
        </div>
        {msg.length > 0
          ? msg
              .slice()
              .reverse()
              .map((contact) => (
                <div
                  className="grid grid-cols-[1fr_1fr_3fr] md:grid-cols-[1fr_1fr_3fr] items-center gap-2 py-1 px-2 border text-sm"
                  key={contact._id}
                >
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                  <p>{contact.message}</p>
                </div>
              ))
          : ""}
      </div>
    </>
  );
};

export default ContactMessages;
