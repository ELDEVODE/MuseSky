import React, { useState, useEffect } from 'react';
import { FiSend, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { TwinkleStars } from '../components';
import BackgroundCircles from '../components/BackgroundCircles';

const CURRENCIES = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    decimals: 8,
    icon: () => (
      <div className="w-10 h-10 bg-white/20 border border-[#FFC252]/20 rounded-lg flex items-center justify-center">
        <span className="text-[#FFC252] font-bold">₿</span>
      </div>
    )
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    icon: () => (
      <div className="w-10 h-10 bg-white/20 border border-[#FFC252]/20 rounded-lg flex items-center justify-center">
        <span className="text-[#FFC252] font-bold">Ξ</span>
      </div>
    )
  },
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    icon: () => (
      <div className="w-10 h-10 bg-white/20 border border-[#FFC252]/20 rounded-lg flex items-center justify-center">
        <span className="text-[#FFC252] font-bold">◎</span>
      </div>
    )
  },
  ICP: {
    name: 'Internet Computer',
    symbol: 'ICP',
    decimals: 8,
    icon: () => (
      <div className="w-10 h-10 bg-white/20 border border-[#FFC252]/20 rounded-lg flex items-center justify-center">
        <span className="text-[#FFC252] font-bold">∞</span>
      </div>
    )
  }
};

const Wallet = ({ principalId }) => {
  const [balances, setBalances] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  useEffect(() => {
    setBalances({
      BTC: '0.001',
      ETH: '1.0',
      SOL: '1.0',
      ICP: '1.0'
    });
  }, [principalId]);

  const handleTransfer = (e) => {
    e.preventDefault();
    console.log(`Transferring ${transferAmount} ${selectedCurrency} to ${recipientId}`);
    setIsTransferModalOpen(false);
  };

  const calculateUSDValue = (amount, currency) => {
    const mockPrices = {
      BTC: 65000,
      ETH: 3500,
      SOL: 150,
      ICP: 12
    };
    return (parseFloat(amount) * mockPrices[currency]).toFixed(2);
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden px-6">
      <div className="w-full py-8 mt-[100px] flex flex-col items-center justify-center">
        {/* Header Section */}
        <div className="flex flex-col w-full items-center justify-center pb-10 gap-4 border-b border-[#CECCD6]/30">
          <h1 className="text-4xl sm:text-5xl font-bold font-['Bricolage Grotesque'] capitalize leading-tight mb-1">
            My Wallet
          </h1>
          <p className="text-sm font-normal font-['Onest'] leading-relaxed text-white/70">
            Principal ID: {principalId}
          </p>
        </div>

        {/* Total Balance Section */}
        <div className="w-full max-w-3xl mt-10">
          <div className="bg-white/20 rounded-lg border border-[#FFC252]/20 p-6 mb-8">
            <p className="text-sm text-[#E6E6EB]/60 font-['Onest'] mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold font-['Bricolage Grotesque']">$12,345.67</h2>
          </div>

          {/* Assets Grid */}
          <div className="space-y-4">
            {Object.entries(balances).map(([currency, amount]) => (
              <div
                key={currency}
                className="bg-white/20 rounded-lg border border-[#FFC252]/20 p-4 hover:border-[#FFC252]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {CURRENCIES[currency].icon()}
                    <div>
                      <h3 className="font-medium font-['Onest']">{CURRENCIES[currency].name}</h3>
                      <p className="text-sm text-[#E6E6EB]/60 font-['Onest']">{CURRENCIES[currency].symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium font-['Onest']">{amount} {currency}</p>
                    <p className="text-sm text-[#E6E6EB]/60 font-['Onest']">
                      ${calculateUSDValue(amount, currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#ffc252] text-black rounded-lg font-semibold font-['Onest'] transition-all duration-300 hover:bg-[#ffd280]"
            >
              <FiSend /> Send
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/20 text-white rounded-lg font-semibold font-['Onest'] transition-all duration-300 hover:bg-white/30"
            >
              <FiPlus /> Receive
            </button>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 rounded-lg border border-[#FFC252]/20 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-[#CECCD6]/30">
              <h2 className="text-xl font-bold font-['Bricolage Grotesque']">Send {selectedCurrency}</h2>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleTransfer} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">Asset</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                >
                  {Object.entries(CURRENCIES).map(([symbol, { name }]) => (
                    <option key={symbol} value={symbol} className="bg-black">
                      {name} ({symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                    placeholder="0.00"
                    step="any"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 font-['Onest']">
                    {selectedCurrency}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">Recipient</label>
                <input
                  type="text"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                  placeholder="Enter recipient's address"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#ffc252] text-black rounded-lg font-semibold font-['Onest'] transition-all duration-300 hover:bg-[#ffd280]"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      <BackgroundCircles count={5} />
      <TwinkleStars frequency={14} />
    </div>
  );
};

export default Wallet;