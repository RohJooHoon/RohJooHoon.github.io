import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email, name, message } = await req.json();

  // Nodemailer 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail', // 예: Gmail을 사용하는 경우
    auth: {
      user: process.env.EMAIL_USER, // 환경 변수에 이메일 주소 저장
      pass: process.env.EMAIL_PASS, // 환경 변수에 이메일 비밀번호 저장
    },
  });

  const mailOptions = {
    from: email, // 클라이언트로부터 받은 이메일 주소 사용
    to: process.env.EMAIL_USER, // 수신자 이메일 주소
    subject: `Portfolio Contact [작성자 : ${name} | 이메일 : ${email}]`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '이메일이 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: '이메일 전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}