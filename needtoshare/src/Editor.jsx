import { useState } from "react";
import { useParams } from "react-router-dom";


function Editor() {
  const [message, setMessage] = useState("");
   // Later this will come from the backend
  const {code}=useParams()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-white flex items-center justify-center px-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          NeedToShare
        </h1>

        <h2 className="text-2xl font-semibold mb-4">
          Update Your Message
        </h2>

        <textarea
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Update Message
        </button>

        <div className="mt-10">

          <h3 className="text-lg font-semibold">
            Room Code
          </h3>

          <div className="mt-3 bg-gray-100 border rounded-xl p-4 text-center text-2xl font-bold tracking-widest">
            {code}
          </div>

          <p className="text-center text-gray-500 mt-4">
            Share this code with others to view your message.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Editor;