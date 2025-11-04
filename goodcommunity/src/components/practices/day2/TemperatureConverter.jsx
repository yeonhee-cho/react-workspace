import React, { useState } from 'react';

// 자식 1: 섭씨 입력
const CelsiusInput = ({ value, handler }) => {
    return (
        <div>
            <label>섭씨 (°C): </label>
            {/* input 만들기 */}
        </div>
    );
}

// 자식 2: 화씨 표시
const FahrenheitDisplay = ({ celsius }) => {
    // 화씨 계산
    return (
        <div>
            {/* 화씨 표시 */}
        </div>
    );
}

// 자식 3: 캘빈 표시
const KelvinDisplay = ({ celsius }) => {
    // 캘빈 계산
    return (
        <div>
            {/* 캘빈 표시 */}
        </div>
    );
}

// 부모 컴포넌트
const TemperatureConverter = () => {
    // 여기에 코드 작성
    // 1. useState로 섭씨 온도 상태 만들기
    // 2. 온도 변경 핸들러 만들기
    // 3. 초기화 핸들러 만들기
    // 4. 온도에 따른 메시지 조건부 렌더링

    return (
        <div>
            <h2>온도 변환기</h2>
            {/* CelsiusInput */}
            {/* FahrenheitDisplay */}
            {/* KelvinDisplay */}
            {/* 온도 메시지 */}
            {/* 초기화 버튼 */}
        </div>
    );
}

export default TemperatureConverter;