"use client";

import React, { useState } from "react";
import commonStyles from "@/app/common.module.css";
import pageStyles from "./page.module.css";

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const [formChecked, setFormChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    setIsLoading(true); // 로딩 상태 시작

    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP}.nip.io/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, message }),
      });

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

    setFormChecked(result);
  };

  return (
    <>
      <main className={`${commonStyles.main} ${commonStyles.is_headerSpace}`}>
        <div className={commonStyles.sectionContainer}>
          {/* Contact */}
          <section className={`${commonStyles.section} ${commonStyles.is_full}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h2 className={commonStyles.sectionTitle}>Contact</h2>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <p className={commonStyles.sectionContentDescription}>
                  취업이나 작업에 대한 문의는 언제든지 환영합니다.
                  <br />
                  아래 폼을 통해 연락 주시면 성심성의껏 답변드리겠습니다.
                </p>
              </div>

              {/* Contact Form */}
              <div className={commonStyles.sectionContent}>
                <form className={commonStyles.sectionForm} onSubmit={handleSendEmail}>
                  <input
                    className={commonStyles.sectionFormInput}
                    type="email"
                    name="email"
                    placeholder="Return Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      formCheck("email", e.target.value);
                    }}
                  />
                  <input
                    className={commonStyles.sectionFormInput}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      formCheck("name", e.target.value);
                    }}
                  />
                  <textarea
                    className={commonStyles.sectionFormTextArea}
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      formCheck("message", e.target.value);
                    }}
                  />
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
