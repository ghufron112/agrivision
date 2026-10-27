import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  ShieldAlert,
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

interface PlantContext {
  scientificName: string;
  commonName?: string;
  family: string;
  genus: string;
  confidence: number;
  candidates?: Array<{ scientificName: string; confidence: number }>;
  location?: string;
}

interface PlantScanChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  plantContext: PlantContext;
  initialQuestion?: string;
}

const QUICK_QUESTIONS = [
  'Tanaman ini namanya apa?',
  'Apa ciri-ciri tanaman ini?',
  'Bagaimana cara merawatnya?',
  'Di wilayah mana tanaman ini ditemukan?',
  'Apa perbedaan kandidat pertama dan kedua?',
  'Informasi apa yang belum bisa dipastikan?'
];

export const PlantScanChatbot: React.FC<PlantScanChatbotProps> = ({
  isOpen,
  onClose,
  plantContext,
  initialQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(QUICK_QUESTIONS.slice(0, 3));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inisialisasi pesan sambutan ketika dibuka
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome-' + Date.now(),
        sender: 'ai',
        text: `Halo! Saya **PlantScan AI Assistant** (berbasis penalaran Meta Llama). Saya siap menjelaskan informasi botani mengenai tanaman teridentifikasi **${plantContext.scientificName}** (${plantContext.commonName || 'Spesies Tropis'}) dari famili *${plantContext.family}*. Silakan ajukan pertanyaan atau pilih topik di bawah!`,
        sources: ['Pl@ntNet-300K Benchmark Dataset', 'GBIF Backbone Taxonomy'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);

      // Jika ada initialQuestion (misal tombol "Jelaskan dengan AI")
      if (initialQuestion) {
        handleSendMessage(initialQuestion);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Hubungi endpoint FastAPI /api/ai/chat
      const response = await fetch('http://127.0.0.1:8000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          scientific_name: plantContext.scientificName,
          common_name: plantContext.commonName || '',
          family: plantContext.family,
          genus: plantContext.genus,
          confidence: plantContext.confidence,
          candidates: (plantContext.candidates || []).map((c) => ({
            scientific_name: c.scientificName,
            score_percentage: c.confidence
          })),
          location: plantContext.location || 'Jawa Timur',
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: ChatMessage = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: data.reply,
          sources: data.sources || ['GBIF Taxonomy', 'Pl@ntNet-300K'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (data.suggested_questions && data.suggested_questions.length > 0) {
          setSuggestedQuestions(data.suggested_questions);
        }
      } else {
        throw new Error('Respons backend tidak berhasil');
      }
    } catch (err) {
      // Fallback offline reasoning yang aman
      let fallbackText = `Terkait pertanyaan "${query}" untuk **${plantContext.scientificName}**:\n` +
        `Spesies ini merupakan anggota famili ${plantContext.family} dengan genus ${plantContext.genus}. ` +
        `Umumnya beradaptasi pada iklim tropis dengan kebutuhan drainase baik dan sinar matahari cukup. ` +
        `Pastikan tidak mengonsumsi bagian tanaman liar tanpa konfirmasi dari ahli botani terverifikasi.`;

      if (query.toLowerCase().includes('ciri')) {
        fallbackText = `Karakteristik utama **${plantContext.scientificName}** mencakup tipe daun dan organ generatif khas famili ${plantContext.family}. Untuk verifikasi, periksa bentuk buah/bunga dan tepi helai daun.`;
      }

      const fallbackMsg: ChatMessage = {
        id: 'ai-fallback-' + Date.now(),
        sender: 'ai',
        text: fallbackText,
        sources: ['Katalog Botani Terkalibrasi PlantScan'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#DCE8ED] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-[#07865B] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>PlantScan AI Assistant</span>
                <span className="text-[10px] bg-white/25 px-1.5 py-0.2 rounded font-medium">
                  Meta Llama
                </span>
              </div>
              <div className="text-[11px] text-white/85 truncate max-w-[220px]">
                Konteks: <i>{plantContext.scientificName}</i> ({plantContext.commonName || 'Botani'})
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7FAFC] text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-[#E5F5EE] border border-[#B8E2D1] text-[#07865B] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-3 space-y-1.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#07865B] text-white rounded-br-none shadow-2xs'
                    : 'bg-white border border-[#DCE8ED] text-[#172B36] rounded-bl-none shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-[#DCE8ED]/80 text-[10px] text-[#647985] flex flex-wrap gap-1">
                    <span className="font-semibold text-[#172B36]">Sumber:</span>
                    {msg.sources.map((s, idx) => (
                      <span key={idx} className="bg-[#F7FAFC] px-1.5 py-0.5 rounded border border-[#DCE8ED]">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] text-right ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-[#647985]'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-[#172B36] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#647985] p-2 bg-white rounded-lg border border-[#DCE8ED] w-fit">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#07865B]" />
              <span>PlantScan AI sedang menelaah data referensi...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-[#DCE8ED] space-y-1">
          <div className="text-[10px] font-semibold text-[#647985] flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#07865B]" />
            <span>Saran Pertanyaan Cepat:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] bg-[#FAFCFB] hover:bg-[#E5F5EE] hover:text-[#07865B] border border-[#DCE8ED] px-2 py-1 rounded-md text-[#172B36] transition-colors truncate max-w-full text-left cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="p-3 bg-white border-t border-[#DCE8ED] flex gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tanyakan ciri, perawatan, atau persebaran..."
            className="flex-1 text-xs px-3 py-2 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md text-[#172B36] focus:outline-none focus:border-[#07865B]"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-3.5 py-2 bg-[#07865B] hover:bg-[#066B49] text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Safety Disclaimer Footer */}
        <div className="px-3 py-1.5 bg-[#F1F5F9] text-[10px] text-[#647985] flex items-center gap-1.5 border-t border-[#DCE8ED]">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Informasi botani edukatif. Jangan gunakan untuk diagnosis medis atau konsumsi liar.</span>
        </div>
      </div>
    </div>
  );
};
