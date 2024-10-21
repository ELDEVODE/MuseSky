import React, { useState, useEffect } from 'react';
import { FiSend, FiPlus, FiMinus, FiRefreshCw } from 'react-icons/fi';

const CURRENCIES = {
    BTC: { name: 'Bitcoin', symbol: 'BTC', decimals: 8 },
    ETH: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    SOL: { name: 'Solana', symbol: 'SOL', decimals: 9 },
    ICP: { name: 'Internet Computer', symbol: 'ICP', decimals: 8 }
};

const Wallet = ({ principalId }) => {
    const [balances, setBalances] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [transferAmount, setTransferAmount] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

    // Simulated wallet data fetching
    useEffect(() => {
        // In real implementation, this would fetch from your Rust backend
        setBalances({
            BTC: '0.001',
            ETH: '1.0',
            SOL: '1.0',
            ICP: '1.0'
        });
    }, [principalId]);

    const handleTransfer = (e) => {
        e.preventDefault();
        // Implementation would call your Rust transfer function
        console.log(`Transferring ${transferAmount} ${selectedCurrency} to ${recipientId}`);
        setIsTransferModalOpen(false);
    };

    return (
        <div className="relative w-full min-h-screen text-white px-6">
            <div className="w-full py-8 mt-[100px] flex flex-col items-center justify-center">
                {/* Header Section */}
                <div className="flex flex-col w-full items-center justify-center pb-10 gap-4 border-b border-[#CECCD6]/30">
                    <h1 className="text-4xl sm:text-5xl font-bold capitalize leading-tight mb-1">
                        My Wallet
                    </h1>
                    <p className="text-sm font-normal leading-relaxed text-white/70">
                        Principal ID: {principalId}
                    </p>
                </div>

                {/* Balances Grid */}
                <div className="w-full max-w-3xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(balances).map(([currency, amount]) => (
                        <div
                            key={currency}
                            className="bg-white/10 rounded-lg p-6 border border-[#FFC252]/20 hover:border-[#FFC252]/40 transition-all duration-300"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-medium">{CURRENCIES[currency].name}</span>
                                <span className="text-[#FFC252]">{CURRENCIES[currency].symbol}</span>
                            </div>
                            <div className="text-2xl font-bold">{amount}</div>
                        </div>
                    ))}
                </div>

                {/* Actions Section */}
                <div className="w-full max-w-3xl mt-8 flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={() => setIsTransferModalOpen(true)}
                        className="flex items-center gap-2 py-4 px-6 bg-[#ffc252] text-black rounded-lg font-semibold 
                     transition-all duration-300 hover:bg-[#ffd280]"
                    >
                        <FiSend /> Transfer
                    </button>
                    <button
                        className="flex items-center gap-2 py-4 px-6 bg-white/20 text-white rounded-lg font-semibold 
                     transition-all duration-300 hover:bg-white/30"
                    >
                        <FiPlus /> Deposit
                    </button>
                    <button
                        className="flex items-center gap-2 py-4 px-6 bg-white/20 text-white rounded-lg font-semibold 
                     transition-all duration-300 hover:bg-white/30"
                    >
                        <FiMinus /> Withdraw
                    </button>
                </div>

                {/* Transfer Modal */}
                {isTransferModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md border border-[#FFC252]/20">
                            <h2 className="text-2xl font-bold mb-6">Transfer Funds</h2>
                            <form onSubmit={handleTransfer} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-[#E6E6EB] font-medium mb-1">
                                        Currency
                                    </label>
                                    <select
                                        value={selectedCurrency}
                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                        className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 
                             text-white text-sm focus:outline-none"
                                    >
                                        {Object.entries(CURRENCIES).map(([symbol, { name }]) => (
                                            <option key={symbol} value={symbol} className="bg-[#1A1A1A]">
                                                {name} ({symbol})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-[#E6E6EB] font-medium mb-1">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                        className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 
                             text-white text-sm focus:outline-none"
                                        placeholder="0.00"
                                        step="any"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-[#E6E6EB] font-medium mb-1">
                                        Recipient Principal ID
                                    </label>
                                    <input
                                        type="text"
                                        value={recipientId}
                                        onChange={(e) => setRecipientId(e.target.value)}
                                        className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 
                             text-white text-sm focus:outline-none"
                                        placeholder="Enter recipient's principal ID"
                                    />
                                </div>

                                <div className="flex justify-between gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 px-4 bg-[#ffc252] text-black rounded-lg font-semibold 
                             transition-all duration-300 hover:bg-[#ffd280]"
                                    >
                                        Confirm Transfer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsTransferModalOpen(false)}
                                        className="flex-1 py-4 px-4 bg-white/20 text-white rounded-lg font-semibold 
                             transition-all duration-300 hover:bg-white/30"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;