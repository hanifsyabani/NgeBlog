'use client'

import { Spinner, useToast } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { ChangeEvent, useState } from "react";

interface Message {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialMessage: Message = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { user } = useUser();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<Message>({
    ...initialMessage,
    name: user?.fullName || "",
    email: user?.emailAddresses[0].emailAddress || "",
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (res.ok) {
        toast({
          title: "Message sent successfully",
          description:
            "Thanks for reaching out. We'll get back to you shortly.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "teal",
        });
        setMessage(initialMessage);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "purple",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className=" w-full relative">
      <div className="pt-24 text-center bg-gradient-to-r from-primary via-tersier to-secondary lg:h-[60vh] w-full">
        <h1 className="text-6xl font-bold text-white">Contact</h1>
        <p className=" text-white">
          Have a question or just want to say hi? Dont hesitate, we love to hear
          from you.
        </p>
      </div>
      <div className="bg-white absolute w-[80%] left-1/2 -translate-x-1/2 top-52 rounded-2xl p-4 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mx-auto gap-6">
            <div className="w-1/2 ">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-gray-200 outline-none px-2 py-3 rounded-xl w-full mt-1"
                  placeholder="Fullname..."
                  name="name"
                  value={message.name}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold">
                  Phone
                </label>
                <input
                  type="text"
                  className="bg-gray-200 outline-none px-2 py-3 rounded-xl w-full mt-1"
                  placeholder="Phone number..."
                  name="phone"
                  value={message.phone}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-gray-200 outline-none px-2 py-3 rounded-xl w-full mt-1"
                  placeholder="Email..."
                  name="email"
                  value={message.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-bold">
                  Subject
                </label>
                <input
                  type="text"
                  className="bg-gray-200 outline-none px-2 py-3 rounded-xl w-full mt-1"
                  placeholder="Subject..."
                  name="subject"
                  value={message.subject}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-sm font-bold ">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols={20}
              rows={10}
              className="bg-gray-200 outline-none px-2 py-3 rounded-xl w-full mt-1"
              placeholder="Drop Message..."
              value={message.message}
              onChange={handleInput}
            />
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-primary hover:bg-blue-900  mt-4 py-3 px-4 rounded-xl text-white font-bold transition-all w-1/2 ">
              {loading ? <Spinner size={"xl"} /> : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
