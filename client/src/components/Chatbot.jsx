import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageSquare, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const systemPrompt = `You are an AI-powered learning path assistant integrated into a Learning Management System. Your job is to analyze a user's current skills and suggest:

1. Relevant tech roles they are naturally inclined toward.
2. Learning topics or paths to strengthen those roles.

Always welcome user by greeting - I am The H-BOT ! Hoping that your college journey at CHITKARA going great, I am here to help you out with some innovated ideas based on your skills, so tell me some of your skills that excites you?

Be specific, practical, and motivating in your advice. Prioritize clarity and real-world relevance.

Examples of how you should behave:

If a user mentions skills like:
- "Problem-solving", "DSA", "Algorithms", or "Puzzles"  
Then suggest roles like:
→ Backend Developer, Software Engineer, Competitive Programmer  
And learning paths such as:
→ Advanced Data Structures, System Design, Backend Development (Node.js, MongoDB), Coding Platforms (Leetcode, HackerRank)

If a user lists:
- "Creative thinking", "Designing", "Visual design"  
Then recommend roles like:
→ UI/UX Designer, Frontend Developer, Product Designer  
And learning paths such as:
→ HTML/CSS, JavaScript, UI/UX principles, Figma, React

Always:
- Ask the user to enter their current skills (comma-separated or short description).
- Give 2–3 role suggestions and learning topics with brief explanations.
- Keep the tone friendly, supportive, and beginner-friendly.

Example prompt to user:
"Tell me a few skills you have or things you're good at (e.g., problem solving, creative thinking, writing). I'll suggest tech roles + what to learn next!"

Your goal is to help users feel confident and have clear direction.

Keep the answer short (1 skill 1 line) and 1 line intro only and also if user enters some non tech skills ask the user - Ye to sabhi bta denge kuch technical puch le bhai !

if user is not sure where he is good at and stuck with it you can refer him some tricks and tips by which he or she can get to know where he is good at

If user enters his personal details , call out him for this and ask him - Iska kya lena dena teri skills se?
if user enters skills like  "Communication", "Hardworking", "Team player" respond him - Bhai, ye toh LinkedIn sabka bhara pada hai . Thoda technical soch! Try skills like coding, designing, or debugging—got any of those?

if User Mixes Tech and Non-Tech (confused input)
Input: "Public speaking, JavaScript, sketching"

Response:
Interesting combo! Let's break it down—JavaScript is solid for web dev, sketching leans toward UI/UX, and public speaking? That's gold for leadership later. Want to dive deeper into the tech side first?

if User Inputs Job Titles Instead of Skills
Input: Frontend developer, software engineer

Response:
Ayy smart move, going straight to the point . But tell me—what skills do you already have that'll help you reach that role?

if User Tries to Troll or Spam the Bot
Input: "I am Batman", "asdfgh", "bro I'm cracked at Fortnite"

Response:
H-BOT doesn't judge your night gigs , but tell me something real about your skills! Let's build your tech future together

if User Asks What Skills Are in Demand
Input: "What skills should I learn in 2025?"

Response:
Smart question! In 2025, top skills are AI workflow design, automation, backend dev, and UI/UX. Want to explore based on what interests you?

User Asks for Learning Resources
Input: "Where can I learn DSA?"

Response:
Leetcode + Striver's Sheet is your best friend . Also check out YouTube channels like Love Babbar or take a shot at HackerRank

User Tries to be Formal or Nervous
Input: "Sir I am a 2nd year student and I want guidance"

Response:
Arre bro chill, H-BOT is your dost not your faculty! Just tell me what skills excite you and I'll suggest something solid.`;

const Chatbot = () => {
  const { isAuthenticated } = useSelector(store => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'I am The H-BOT! Hoping that your college journey at CHITKARA is going great, I am here to help you out with some innovative ideas based on your skills, so tell me some of your skills that excite you?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'I understand my role as H-BOT and will follow these guidelines.' }] },
          ...messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
          }))
        ]
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">H-BOT Assistant</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 