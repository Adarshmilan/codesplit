import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();

  function handeljoinroom(text) {
    if (!text) {
      window.alert("Enter a room code");
      return;
    }

    console.log("Room Code:", text);

    // Later this will take the user to the viewer page
    // navigate(`/view/${text}`);
  }

  function haldelgenerate() {
    if (!message) {
      window.alert("Enter some message first");
      return;
    }

    // Later this code will come from your backend
    const code = "ABC123";

    // Redirect to the editor page
    navigate(`/editor/${code}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-white flex flex-col items-center p-10">

      {/* Logo */}
      <h1 className="text-5xl font-bold text-white mb-4">
        NeedToShare
      </h1>

      <p className="text-2xl text-white mb-10">
        Share securely with your friends
      </p>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">

        {/* Left Side */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Write Message
          </h2>

          <textarea
            rows="12"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={haldelgenerate}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Generate Code
          </button>

        </div>

        {/* Right Side */}
        <div className="w-full md:w-96 bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Join Room
          </h2>

          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handeljoinroom(roomCode)}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            Join Room
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;