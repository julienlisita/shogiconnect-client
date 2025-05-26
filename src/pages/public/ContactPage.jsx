// src/pages/public/ContactPage.jsx

import "../../markdown.css";
import PublicLayout from "../../layouts/PublicLayout";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PageTitle from "../../components/common/PageTitle";

export default function ContactPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/content/contact.md")
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, []);

  return (
    <PublicLayout>
        <main className="main-without-banner markdown">
            <PageTitle>Contact</PageTitle>
            <ReactMarkdown>{content}</ReactMarkdown>
        </main>
    </PublicLayout>
  );
}