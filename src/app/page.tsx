"use client";

import React, { useRef, useState } from "react";
import commonStyles from "@/app/common.module.css";
import pageStyles from "./page.module.css";
import Header from "@/components/header";
import { Banner } from "./page.component";

export default function Page() {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formChecked, setFormChecked] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    setIsLoading(true); // 로딩 상태 시작

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP}:3100/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, message }),
      });

      console.log("response : ", response);

      if (response.ok) {
        alert("이메일이 성공적으로 전송되었습니다.");
        setEmail(""); // 입력 필드 초기화
        setName(""); // 입력 필드 초기화
        setMessage(""); // 입력 필드 초기화
      } else {
        alert("이메일 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const handleShowMoreClick = () => {
    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formCheck = (target: string, value: string) => {
    var result = true;
    var emailValue = email;
    var nameValue = name;
    var messageValue = message;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[가-힣a-zA-Z]{2,8}$/;

    if (target === "email") {
      emailValue = value;
    } else if (target === "name") {
      nameValue = value;
    } else if (target === "message") {
      messageValue = value;
    }

    if (!emailRegex.test(emailValue) || !nameRegex.test(nameValue) || messageValue === "") {
      result = false;
    }

    setFormChecked(result)
  };

  return (
    <>
      <Header />
      <main className={pageStyles.main}>
        <Banner onShowMoreClick={handleShowMoreClick} />
        <div className={commonStyles.sectionContainer} ref={firstSectionRef}>
          {/* About Me */}
          <section className={commonStyles.section}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>About Me</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>Master’s degree</h3>
                <p className={commonStyles.sectionContentDescription}>Feel free to reach out for projects, collaborations, or just to say hello! Currently seeking new opportunities.</p>
              </div>
            </div>
          </section>

          {/* Work Experiences */}
          <section className={`${commonStyles.section} ${commonStyles.is_triple}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Work Experiences</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>대리 / Front-End Development</h3>
                <p className={commonStyles.sectionContentDescription}>
                  키위스냅
                  <br />
                  2020.11 - 2024.03
                </p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>주임 / Front-End Development</h3>
                <p className={commonStyles.sectionContentDescription}>
                  더클로젯컴퍼니
                  <br />
                  2020.04 - 2020.11
                </p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>주임 / DEV</h3>
                <p className={commonStyles.sectionContentDescription}>
                  에이치나인
                  <br />
                  2017.04 - 2020.01
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className={`${commonStyles.section} ${commonStyles.is_triple}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Education</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>고려사이버대학교</h3>
                <p className={commonStyles.sectionContentDescription}>
                  디자인공학과
                  <br />
                  2017.3 - 2019.8
                </p>
              </div>
              <div className={commonStyles.sectionContent}>
                <h3 className={commonStyles.sectionContentTitle}>계원예술대학교</h3>
                <p className={commonStyles.sectionContentDescription}>
                  디지털미디어디자인과
                  <br />
                  2012.3 - 2016.2
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className={commonStyles.section}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Contact</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <strong className={commonStyles.sectionContentTitle}>
                  취업이나 작업에 대한 문의는 언제든지 환영합니다.
                  <br />
                  아래 폼을 통해 연락 주시면 성심성의껏 답변드리겠습니다.
                </strong>
              </div>

              {/* Contact Form */}
              <div className={commonStyles.sectionContent}>
                <form className={commonStyles.sectionForm} onSubmit={handleSendEmail}>
                  <input className={commonStyles.sectionFormInput} type="email" name="email" placeholder="Return Email" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                    formCheck('email', e.target.value);
                  }} />
                  <input className={commonStyles.sectionFormInput} type="text" name="name" placeholder="Name" value={name} onChange={(e) => {
                    setName(e.target.value);
                    formCheck('name', e.target.value);
                  }} />
                  <textarea className={commonStyles.sectionFormTextArea} name="message" placeholder="Message" value={message} onChange={(e) => {
                    setMessage(e.target.value);
                    formCheck('message', e.target.value);
                  }} />
                  <div className={commonStyles.sectionFormBox}>
                    <button className={commonStyles.sectionFormSend} type="submit" disabled={!formChecked || isLoading}>
                      {isLoading ? "전송 중..." : "전송"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
