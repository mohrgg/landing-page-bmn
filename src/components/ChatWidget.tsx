'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'admin';
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Halo! Selamat datang di Portal BMN Kemnaker. Ada yang bisa saya bantu?',
            sender: 'admin',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [showTooltip, setShowTooltip] = useState(true);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
            setShowTooltip(false);
        }
    }, [isOpen, isMinimized]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simulate admin typing & response (demo only)
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const autoReply: Message = {
                id: messages.length + 2,
                text: 'Terima kasih atas pertanyaannya. Tim kami akan segera merespons. Mohon tunggu sebentar ya! 😊',
                sender: 'admin',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, autoReply]);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* BARAN Mascot Trigger */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 max-w-[200px] mr-2 relative"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowTooltip(false);
                                        }}
                                        className="absolute -top-2 -right-2 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition-colors shadow-sm"
                                    >
                                        <X className="w-3 h-3 text-slate-500" />
                                    </button>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        <span className="font-bold text-[#153e70]">Hai!</span> Saya <span className="font-semibold">BARAN</span>, maskot BMN Kemnaker. Selamat datang pengguna aset negara! 🎉
                                    </p>
                                    <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mascot Button */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(true)}
                            className="w-24 h-24 md:w-36 md:h-36 cursor-pointer drop-shadow-2xl focus:outline-none"
                        >
                            <Image
                                src="/images/Burung BMN.png"
                                alt="Maskot BARAN"
                                width={144}
                                height={144}
                                className="w-full h-full object-contain"
                            />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '500px'
                        }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#153e70] to-[#1e5090] text-white p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden p-0.5">
                                <Image
                                    src="/images/Burung BMN.png"
                                    alt="BARAN"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm">Live Chat BMN</h3>
                                <p className="text-xs text-white/70 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <AnimatePresence>
                            {!isMinimized && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="flex-1 flex flex-col"
                                >
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 max-h-[320px]">
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                        ? 'bg-[#153e70] text-white rounded-br-md'
                                                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm'
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                                <span className="text-[10px] text-slate-400 mt-1 px-1">
                                                    {formatTime(msg.timestamp)}
                                                </span>
                                            </motion.div>
                                        ))}

                                        {/* Typing Indicator */}
                                        {isTyping && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-start"
                                            >
                                                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                                                    <div className="flex items-center gap-1">
                                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-3 border-t border-slate-100 bg-white">
                                        <div className="flex items-center gap-2">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Ketik pesan Anda..."
                                                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#153e70]/20 focus:border-[#153e70]"
                                            />
                                            <button
                                                onClick={handleSend}
                                                disabled={!inputValue.trim()}
                                                className="p-2.5 bg-[#153e70] text-white rounded-full hover:bg-[#1e5090] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-slate-400 text-center mt-2">
                                            Powered by Portal BMN Kemnaker
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
