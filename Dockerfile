# 첫 번째 단계: 빌드 환경 설정
FROM node:16 as build-stage

# 빌드 인수 선언
ARG REACT_APP_KAKAO_API_KEY

# 환경 변수 설정
ENV REACT_APP_KAKAO_API_KEY=$REACT_APP_KAKAO_API_KEY

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치 및 애플리케이션 코드 복사
COPY package*.json ./
RUN npm install
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: Nginx를 사용하여 정적 파일 서빙
FROM nginx:alpine

# 빌드 단계에서 생성된 빌드 파일 복사
COPY --from=build-stage /app/build /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 포트 설정
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
