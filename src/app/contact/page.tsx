"use client";

import React, { useState } from "react";
import commonStyles from "@/app/common.module.css";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const apiHost = process.env.NEXT_PUBLIC_EC2_INSTANCE_PUBLIC_IP;
  const formChecked = Boolean(apiHost && email.trim() && name.trim() && message.trim());

  const handleSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formChecked || isLoading) return;
    setIsLoading(true);
    setStatus("");
    try {
      const response = await fetch(`https://${apiHost}.nip.io/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), message: message.trim() }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Email request failed");
      setStatus("이메일이 전송되었습니다.");
      setEmail("");
      setName("");
      setMessage("");
    } catch {
      setStatus("전송하지 못했습니다. 아래 이메일 주소로 직접 연락해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main id="main-content" tabIndex={-1} className={`${commonStyles.main} ${commonStyles.is_headerSpace}`}>
        <div className={commonStyles.sectionContainer}>
          {/* Contact */}
          <section className={`${commonStyles.section} ${commonStyles.is_full}`}>
            <div className={commonStyles.sectionTitleWrap}>
              <h1 className={commonStyles.sectionTitle}>Contact</h1>
            </div>
            <div className={commonStyles.sectionContentWrap}>
              <div className={commonStyles.sectionContent}>
                <p className={commonStyles.sectionContentDescription}>
                  취업이나 작업에 대한 문의는 언제든지 환영합니다.
                  <br />
                  이메일로 연락 주시면 성심성의껏 답변드리겠습니다.
                </p>
              </div>

              {/* Contact Form */}
              <div className={commonStyles.sectionContent}>
                <p><a href="mailto:joohoon.roh@gmail.com">joohoon.roh@gmail.com</a></p>
                {apiHost && <form className={commonStyles.sectionForm} onSubmit={handleSendEmail} aria-busy={isLoading}>
                  <label htmlFor="contact-email">답변받을 이메일</label>
                  <input
                    className={commonStyles.sectionFormInput}
                    id="contact-email"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    placeholder="Return Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="contact-name">이름</label>
                  <input
                    id="contact-name"
                    required
                    autoComplete="name"
                    className={commonStyles.sectionFormInput}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label htmlFor="contact-message">문의 내용</label>
                  <textarea
                    id="contact-message"
                    required
                    className={commonStyles.sectionFormTextArea}
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <div className={commonStyles.sectionFormBox}>
                    <button className={commonStyles.sectionFormSend} type="submit" disabled={!formChecked || isLoading}>
                      {isLoading ? "전송 중..." : "전송"}
                    </button>
                  </div>
                  <p role="status">{status}</p>
                </form>}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
