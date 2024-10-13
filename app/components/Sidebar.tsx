import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-[#0052CC] text-white min-h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} relative flex flex-col`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-4 ${isOpen ? 'right-4' : 'left-1/2 -translate-x-1/2'} p-2 bg-[#0065FF] text-white rounded hover:bg-[#0747A6] transition-all duration-300`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold mb-6 mt-12">NextJS 실습</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="block p-3 rounded hover:bg-[#0065FF] transition-all duration-300">
                  <h3 className="text-lg font-semibold">Home</h3>
                  <p className="text-sm text-blue-200">메인 페이지로 이동</p>
                </Link>
              </li>
              <li>
                <Link href="/todo" className="block p-3 rounded hover:bg-[#0065FF] transition-all duration-300">
                  <h3 className="text-lg font-semibold">Todo List</h3>
                  <p className="text-sm text-blue-200">할 일 목록</p>
                </Link>
              </li>
              <li>
                <Link href="/widget" className="block p-3 rounded hover:bg-[#0065FF] transition-all duration-300">
                  <h3 className="text-lg font-semibold">Widget</h3>
                  <p className="text-sm text-blue-200">위젯 목록</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
