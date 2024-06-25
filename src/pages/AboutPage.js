import React from 'react';

function AboutPage() {
  return (
    <div style={{ width: '800px', padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', lineHeight: '1.6', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#333' }}>VoiceFinder 소개</h1>
        <p style={{ fontSize: '1.2em', color: '#777' }}>체험단 마케팅의 미래, VoiceFinder와 함께하세요.</p>
      </header>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>우리의 미션</h2>
        <p>
          VoiceFinder는 디지털 마케팅의 새로운 패러다임을 제시합니다. 소비자 경험을 통해 솔직한 리뷰를 생성하고, 
          이를 바탕으로 신뢰도 높은 마케팅 성과를 도출하는 것이 우리의 목표입니다.
        </p>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>서비스 특징</h2>
        <p>
          VoiceFinder는 최첨단 기술을 활용하여 사용자의 필요와 선호를 정확하게 파악하고, 최적의 상점을 추천합니다. 
          이를 통해 체험단 마케팅의 참여도를 높이고, 실질적인 리뷰를 유도하여 마케팅 효과를 극대화합니다.
        </p>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>사용자 혜택</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>개인 맞춤형 추천으로 관심 있는 상점 발견</li>
          <li>체험단 참여를 통해 다양한 혜택 제공</li>
          <li>신뢰할 수 있는 리뷰를 통해 더 나은 소비 결정</li>
        </ul>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>마켓 혜택</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>효과적인 디지털 마케팅 도구 제공</li>
          <li>고객의 솔직한 리뷰로 신뢰도 향상</li>
          <li>체험단 참여로 인한 마케팅 성과 극대화</li>
          <li>실시간 데이터 분석을 통한 마케팅 전략 개선</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>마켓 관리 및 분석</h2>
        <p>
          VoiceFinder는 마켓 관리 및 분석 도구를 제공합니다. 마켓은 자신들의 캠페인을 관리하고, 체험단 참여 현황과 리뷰 상태를 실시간으로 모니터링할 수 있습니다. 
          또한, 다양한 분석 도구를 통해 마케팅 전략을 최적화할 수 있습니다.
        </p>
        <img src="https://via.placeholder.com/900X300" alt="Market Management and Analytics" style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }} />
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '20px' }}>
          <li>캠페인 관리: 손쉽게 새로운 캠페인을 생성하고 관리</li>
          <li>실시간 데이터 모니터링: 체험단 참여와 리뷰 상태를 실시간으로 확인</li>
          <li>종합 분석: 마케팅 효과 분석 및 전략 개선을 위한 데이터 제공</li>
          <li>사용자 피드백 분석: 리뷰와 피드백을 통해 고객의 요구사항 파악</li>
        </ul>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>추천 시스템</h2>
        <p>
          저희의 하이브리드 추천 시스템은 콘텐츠 기반 필터링과 협업 필터링을 결합하여, 사용자에게 가장 적합한 상점을 
          추천합니다. 이 시스템은 사용자의 취향과 과거 데이터를 분석하여 정확한 맞춤형 추천을 제공합니다.
        </p>
        <img src="https://via.placeholder.com/900X300" alt="Recommendation System Diagram" style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }} />
      </section>
      
      
      <section style={{ textAlign: 'center', padding: '20px', backgroundColor: '#333', color: '#fff', borderRadius: '8px' }}>
        <p>
          궁금한 사항이 있으시면 언제든지 <a href="mailto:support@voicefinder.kr" style={{ color: '#ffcc00' }}>support@voicefinder.kr</a>로 연락해 주세요.
        </p>
        <p>저희는 여러분의 피드백을 소중히 생각합니다.</p>
      </section>
    </div>
  );
}

export default AboutPage;
