import React, { useState } from 'react';

const TabSwitcher = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');

  return (
    <>
      <div className="mx-auto mb-5 w-full max-w-3xl rounded-2xl border border-[#f8d06f]/22 bg-[linear-gradient(120deg,rgba(7,17,30,0.95)_0%,rgba(9,26,42,0.92)_55%,rgba(8,18,31,0.95)_100%)] p-2 shadow-[0_14px_30px_rgba(0,0,0,0.32)]">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`relative rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300 sm:text-sm ${
              activeTab === tab.label
                ? 'border border-[#f8d06f]/60 bg-[linear-gradient(120deg,rgba(248,208,111,0.34)_0%,rgba(227,170,57,0.24)_58%,rgba(81,205,255,0.2)_100%)] text-[#fff3d1] shadow-[0_10px_24px_rgba(248,208,111,0.22)]'
                : 'border border-transparent text-[#c8d6ea] hover:border-[#f8d06f]/30 hover:bg-[rgba(248,208,111,0.07)] hover:text-[#f9e8bc]'
            }`}
          >
            {tab.label}
            {activeTab === tab.label && (
              <span className="absolute bottom-0.5 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,rgba(248,208,111,0)_0%,rgba(248,208,111,1)_50%,rgba(248,208,111,0)_100%)]" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-2">
        {tabs.map((tab) =>
          tab.label === activeTab ? (
            <div key={tab.label}>{tab.content}</div>
          ) : null
        )}
      </div>
    </>
  )
};

export default TabSwitcher;
