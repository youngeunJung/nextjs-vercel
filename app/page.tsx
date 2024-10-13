'use client'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Joyride, { Step } from 'react-joyride';
import Sidebar from './components/Sidebar';
import { FaLayerGroup } from 'react-icons/fa'; // 아이콘 추가를 위한 import

// 설명 상태를 위한 인터페이스 정의
interface ExplanationState {
  twoColumn?: boolean;
  threeColumn?: boolean;
  sidebar?: boolean;
  cardGrid?: boolean;
  headerFooter?: boolean;
}

export default function Home() {
  const [showExplanations, setShowExplanations] = useState<ExplanationState>({});
  const [runTour, setRunTour] = useState(true);  // Keep this as true
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleExplanation = (sectionId: keyof ExplanationState) => {
    setShowExplanations(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const steps: Step[] = [
    {
      target: '.layout-examples',
      content: '여기서 다양한 레이아웃 예제를 확인할 수 있습니다.',
      placement: 'right',
    },
    {
      target: '.two-column-layout',
      content: '기본적인 2열 구조 레이아웃입니다. 모바일에서는 세로로, 데스크톱에서는 가로로 배치됩니다.',
    },
    {
      target: '.three-column-grid',
      content: '화면 크기에 따라 1열, 2열, 3열로 변화하는 반응형 그리드 레이아웃입니다.',
    },
    {
      target: '.sidebar-layout',
      content: '사이드바와 메인 콘텐츠 영역을 가진 일반적인 웹 페이지 구조입니다.',
    },
    {
      target: '.card-grid-layout',
      content: '반응형 카드 그리드 레이아웃입니다. 화면 크기에 따라 열 수가 변경됩니다.',
    },
    {
      target: '.header-footer-layout',
      content: '헤더, 메인 콘텐츠, 푸터로 구성된 형적인 웹 페이지 구조입니다.',
    },
    {
      target: '.explanation-button',
      content: '이 버튼을 클릭하면 각 레이아웃에 사용된 CSS 클래스에 대한 자세한 설명을 볼 수 있습니다.',
    },
  ];

  if (!isMounted) {
    return null; // 또는 로딩 인디케이터
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Head>
        <title>Layout Study</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-grow">
        <Sidebar />

        <main className="flex-grow flex justify-center p-8">
          <div className="w-full lg:w-1/2 overflow-y-auto p-8 border-r border-gray-200">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center">
              <FaLayerGroup className="mr-2" /> Layout Study 수정
            </h1>
            
            <div className="space-y-12 layout-examples">
              <section className="two-column-layout">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Two-Column Layout</h2>
                <p className="mb-4 text-gray-600">깔끔하고 균형 잡힌 2열 레이아웃입니다.</p>
                <button
                  onClick={() => toggleExplanation('twoColumn')}
                  className="explanation-button mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {showExplanations.twoColumn ? '설명 숨기기' : 'CSS 클래스 설명 보기'}
                </button>
                {showExplanations.twoColumn && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <ul className="list-disc pl-5">
                      <li><code>flex flex-col md:flex-row</code>: 모바일에서는 세로로, 중간 크기 이상에서는 가로로 배치</li>
                      <li><code>gap-4</code>: 요소 사이에 1rem(16px) 간격 추가</li>
                      <li><code>flex-1</code>: 각 열이 동일한 너비를 가지도록 설정</li>
                      <li><code>bg-blue-100</code>, <code>bg-green-100</code>: 배경색 지정</li>
                      <li><code>p-4</code>: 모든 방향에 1rem 패딩 추가</li>
                      <li><code>rounded</code>: 모서리를 둥글게 처리</li>
                    </ul>
                  </div>
                )}
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>{`<div className="flex flex-col md:flex-row gap-8">
  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">Column 1</div>
  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">Column 2</div>
</div>`}</code>
                </pre>
              </section>

              <hr />

              <section className="three-column-grid">
                <h2 className="text-2xl font-semibold mb-4">Responsive Three-Column Grid</h2>
                <p className="mb-4">이 그리드는 화면 크기에 따라 1열, 2열, 3열로 변화하는 반응형 레이아웃입니다.</p>
                <button
                  onClick={() => toggleExplanation('threeColumn')}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {showExplanations.threeColumn ? '설명 숨기기' : 'CSS 클래스 설명 보기'}
                </button>
                {showExplanations.threeColumn && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <ul className="list-disc pl-5">
                      <li><code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3</code>: 반응형 그리드 설정</li>
                      <li><code>gap-4</code>: 요소 사이에 1rem(16px) 간격 추가</li>
                      <li><code>bg-red-100</code>, <code>bg-yellow-100</code>, <code>bg-purple-100</code>: 배경색 지정</li>
                      <li><code>p-4</code>: 모든 방향에 1rem 패딩 추가</li>
                      <li><code>rounded</code>: 모서리를 둥글게 처리</li>
                    </ul>
                  </div>
                )}
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="bg-red-100 p-4 rounded">Column 1</div>
  <div className="bg-yellow-100 p-4 rounded">Column 2</div>
  <div className="bg-purple-100 p-4 rounded">Column 3</div>
</div>`}</code>
                </pre>
              </section>

              <section className="sidebar-layout">
                <h2 className="text-2xl font-semibold mb-4">Sidebar with Main Content</h2>
                <p className="mb-4">이 레이아웃은 사이드바와 메인 콘텐츠 영역을 가진 일반적인 웹 페이지 구조를 보여줍니다.</p>
                <button
                  onClick={() => toggleExplanation('sidebar')}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {showExplanations.sidebar ? '설명 숨기기' : 'CSS 클래스 설명 보기'}
                </button>
                {showExplanations.sidebar && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <ul className="list-disc pl-5">
                      <li><code>flex flex-col md:flex-row</code>: 모바일에서는 세로로, 중간 크기 이상에서는 가로로 배치</li>
                      <li><code>gap-4</code>: 요소 사이에 1rem(16px) 간격 추가</li>
                      <li><code>md:w-1/4</code>: 사이드바의 너비 설정</li>
                      <li><code>bg-gray-200</code>: 사이드바의 배경색 설정</li>
                      <li><code>md:w-3/4</code>: 메인 콘텐츠 영역의 너비 설정</li>
                      <li><code>bg-gray-100</code>: 메인 콘텐츠 영역의 배경색 설정</li>
                      <li><code>p-4</code>: 모든 방향에 1rem 패딩 추가</li>
                      <li><code>rounded</code>: 모서리를 둥글게 처리</li>
                    </ul>
                  </div>
                )}
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>{`<div className="flex flex-col md:flex-row gap-4">
  <div className="md:w-1/4 bg-gray-200 p-4 rounded">Sidebar</div>
  <div className="md:w-3/4 bg-gray-100 p-4 rounded">Main Content</div>
</div>`}</code>
                </pre>
              </section>

              <hr />

              <section className="card-grid-layout">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Card Grid Layout</h2>
                <p className="mb-4 text-gray-600">세련된 카드들로 구성된 반응형 그리드입니다.</p>
                <button
                  onClick={() => toggleExplanation('cardGrid')}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {showExplanations.cardGrid ? '설명 숨기기' : 'CSS 클래스 설명 보기'}
                </button>
                {showExplanations.cardGrid && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <ul className="list-disc pl-5">
                      <li><code>grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4</code>: 반응형 그리드 설정</li>
                      <li><code>gap-4</code>: 요소 사이에 1rem(16px) 간격 추가</li>
                      <li><code>bg-white</code>: 카드의 배경색 설정</li>
                      <li><code>shadow</code>: 카드의 그림자 설정</li>
                      <li><code>rounded</code>: 카드의 모서리 둥글게 처리</li>
                      <li><code>p-4</code>: 카드의 패딩 설정</li>
                    </ul>
                  </div>
                )}
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>{`<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
    <div key={item} className="bg-white rounded-lg shadow-sm p-6">Card {item}</div>
  ))}
</div>`}</code>
                </pre>
              </section>

              <hr />

              <section className="header-footer-layout">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Header, Main, Footer Layout</h2>
                <p className="mb-4 text-gray-600">현대적인 감각을 더한 전통적인 웹 페이지 구조입니다.</p>
                <button
                  onClick={() => toggleExplanation('headerFooter')}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  {showExplanations.headerFooter ? '설명 숨기기' : 'CSS 클래스 설명 보기'}
                </button>
                {showExplanations.headerFooter && (
                  <div className="mb-4 p-4 bg-gray-100 rounded">
                    <ul className="list-disc pl-5">
                      <li><code>flex flex-col min-h-screen</code>: 전체 화면 구조</li>
                      <li><code>bg-blue-500</code>: 헤더의 배경색 설정</li>
                      <li><code>text-white</code>: 헤더의 텍스트 색상 설정</li>
                      <li><code>p-4</code>: 헤더의 패딩 설정</li>
                      <li><code>bg-gray-100</code>: 메인 콘텐츠 영역의 배경색 설정</li>
                      <li><code>p-4</code>: 메인 콘텐츠 영역의 패딩 설정</li>
                      <li><code>bg-gray-800</code>: 푸터의 배경색 설정</li>
                      <li><code>text-white</code>: 푸터의 텍스트 색상 설정</li>
                      <li><code>p-4</code>: 푸터의 패딩 설정</li>
                    </ul>
                  </div>
                )}
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>{`<div className="flex flex-col min-h-screen bg-gray-50">
  <header className="bg-white shadow-sm p-6">Header</header>
  <main className="flex-grow bg-gray-50 p-6">Main Content</main>
  <footer className="bg-gray-100 p-6 text-gray-600">Footer</footer>
</div>`}</code>
                </pre>
              </section>
            </div>
          </div>

          <div className="hidden lg:block w-1/2 overflow-y-auto p-8 bg-gray-50">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Live Examples</h1>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Two-Column Layout</h2>
                <div className="h-40 flex flex-col md:flex-row gap-8">
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    왼쪽 칸: 여기에 네 장난감을 놓아보자!
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    오른쪽 칸: 여기에 네 책을 놓아보자!
                  </div>
                </div>
              </section>

              <hr />

              <section>
                <h2 className="text-2xl font-semibold mb-4">Responsive Three-Column Grid</h2>
                <div className="h-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-red-100 p-4 rounded">Column 1</div>
                  <div className="bg-yellow-100 p-4 rounded">Column 2</div>
                  <div className="bg-purple-100 p-4 rounded">Column 3</div>
                </div>
              </section>

              <hr />

              <section>
                <h2 className="text-2xl font-semibold mb-4">Sidebar with Main Content</h2>
                <div className="h-40 flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 bg-gray-200 p-4 rounded">Sidebar</div>
                  <div className="md:w-3/4 bg-gray-100 p-4 rounded">Main Content</div>
                </div>
              </section>

              <hr />

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Card Grid Layout</h2>
                <div className="h-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-sm p-6">Card {item}</div>
                  ))}
                </div>
              </section>

              <hr />

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Header, Main, Footer Layout</h2>
                <div className="h-40 flex flex-col min-h-[50vh] border rounded-lg overflow-hidden">
                  <header className="bg-white shadow-sm p-6">Header</header>
                  <main className="flex-grow bg-gray-50 p-6">Main Content</main>
                  <footer className="bg-gray-100 p-6 text-gray-600">Footer</footer>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {isMounted && (
        <Joyride
          steps={steps}
          run={runTour}
          continuous={true}
          showSkipButton={true}
          styles={{
            options: {
              primaryColor: '#0052CC',
            },
          }}
          callback={(data) => {
            const { status } = data;
            if (status === 'finished' || status === 'skipped') {
              setRunTour(false);
            }
          }}
        />
      )}
    </div>
  );
}