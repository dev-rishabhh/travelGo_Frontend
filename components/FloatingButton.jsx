import React, { useState } from "react";
import { ArrowRight, Sparkles, Trash, X, } from "lucide-react";
import { BASE_URL } from "@/apis/api";
import { useRouter } from "next/navigation";

const FloatingButton = () => {
  const router = useRouter()

  const [isclicked, setisclicked] = useState(false)
  const [message, setMessage] = useState([])
  const [aiResponse, setAiResponse] = useState(false)
  const [prompt, setPrompt] = useState("")

  const suggestions = [
    {
      icon: "🌤️",
      title: "Family vacation ideas",
      description: "Best destination for trip with family and kids"
    },
    {
      icon: "🏛️",
      title: "Recommendation for nature lovers",
      description: "Best places to go for exploring nature"
    },
    {
      icon: "🍽️",
      title: "Romantic destination and gateways",
      description: "Recommend destination for couples or honeymoon"
    },
  ];


  const handleSuggestionClick = (description) => {
    setPrompt(description)
  }


  const handleSendMessage = async (e, message) => {
    e.preventDefault()
    setPrompt("")

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date(),
      isUser: true
    };
    setMessage(prev => [...prev, userMessage]);

    setAiResponse(true)

    console.log('Sent message:', message);

    try {
      const response = await fetch(`${BASE_URL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
        credentials: "include"
      });

      if (response.status === 401) {
        router.push("/login");
      }

      const data = await response.json();

      if (data.error) {
         setAiResponse(false)
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: "Too many requests, Try again!",
          timestamp: new Date(),
          isUser: false
        };
        setMessage(prev => [...prev, aiMessage]);
      } else {
        setAiResponse(false)
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data,
          timestamp: new Date(),
          isUser: false
        };
        setMessage(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };



  return (
    <div className="">
      {/* button */}
      <div
        onClick={() => setisclicked(!isclicked)}
        className="fixed bottom-6 right-6 p-4 bg-orange-500 hover:bg-orange-600 text-white transition-colors rounded-4xl z-99 cursor-pointer">
        <Sparkles/>
      </div>

      {/* popup */}
      {isclicked &&
        <div
          className={`min-h-screen z-100  fixed max-w-[600px] transform transition-transform duration-500 ease-in-out 
         right-0 top-0 ${open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"}
         bg-white flex flex-col`}>
          <div className="">
            <div className="bg-white shadow-lg border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <button className=" hover:bg-gray-200 px-2 py-1 rounded-lg"
                onClick={() => setisclicked(false)}>
                <X size={16} />
              </button>
              <h1 className="text-lg font-bold text-gray-900">Ask NEKO to help you!</h1>
              <button
                onClick={() => setMessage([])}
                className="hover:bg-gray-200 px-2 py-1 rounded-lg">
                <Trash size={16} />
              </button>
            </div>
            {/* main content */}

            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
              <div className="overflow-y-auto">
                {/* Greeting */}
                {message.length === 0 ? (
                  <>
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">
                        <span className="text-blue-500">Hi Traveler, </span>
                      </h2>
                      <p className="text-gray-400 text-xl mt-2">
                        How can I make your travel better
                      </p>
                    </div>

                    {/* Suggestions */}
                    <div className="py-4">
                      <p className="text-gray-600 text-sm py-4">
                        Don't know where to start? Try some of our suggestions
                      </p>

                      <div className="space-y-3">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion.description)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="text-orange-500 text-xl">
                                {suggestion.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-gray-900 font-medium text-sm">
                                  {suggestion.title}
                                </h3>
                                <p className="text-gray-600 text-xs mt-1">
                                  {suggestion.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>) : (
                  // Chat message
                  <div className="flex-1 space-y-4  ">
                    {message.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={` px-4 py-2 rounded-lg ${message.isUser
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isUser ? 'text-orange-100' : 'text-gray-500'
                            }`}>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {aiResponse && <p className="absolute left-5 text-gray-400 text-[14px] ">Responding.....</p>}
                  </div>
                )}

                {/* Message Input */}
                <div className="py-4 fixed w-[85%] bottom-0 ">
                  <form
                    onSubmit={(e) => handleSendMessage(e, prompt)}
                    className="flex items-center space-x-2 bg-white rounded-full border border-gray-200 px-4 py-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Type a message "
                      className="flex-1 outline-none text-gray-700 text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-colors cursor-pointer"
                      disabled={!prompt.trim()}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
    </div>
  );
};

export default FloatingButton;
