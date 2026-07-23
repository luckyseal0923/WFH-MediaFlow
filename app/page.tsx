"use client";

import { FormEvent, useMemo, useState } from "react";

const services = ["平面設計", "照片修圖", "圖文排版", "圖文掃描", "護貝", "光碟燒錄"];
const printSizes = ["A5", "A4", "A3", "B4"];
const largeSizes = ["A2（42×59.4 cm）", "A1（59.4×84 cm）", "A0（84×118 cm）", "90×120 cm", "90×140 cm", "90×150 cm", "90×160 cm", "90×180 cm", "90×350 cm"];
const photoSizes = ["3×5", "4×6", "A4"];

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const showsOutput = useMemo(() => selectedServices.some((item) => ["平面設計", "照片修圖", "圖文排版"].includes(item)), [selectedServices]);

  const toggleService = (service: string) => {
    setSelectedServices((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedServices.length) {
      setNotice("請至少選擇一項製作服務。");
      return;
    }
    setNotice("");
    setSubmitted(true);
  };

  if (submitted) {
    return <main className="shell"><section className="complete"><span className="complete-mark">✓</span><p className="eyebrow">申請已建立</p><h1>我們已收到您的製作需求</h1><p>案件編號將寄送至您填寫的 Email；多媒體中心人員會依需求與交期聯繫您。</p><button onClick={() => setSubmitted(false)}>建立另一筆申請</button></section></main>;
  }

  return (
    <main className="shell">
      <header className="hero">
        <div className="brand"><span className="brand-mark">M</span><span>多媒體中心</span></div>
        <p className="eyebrow">MEDIA PRODUCTION REQUEST</p>
        <h1>製作申請平台</h1>
        <p>請完整填寫需求；送出後，我們將以 Email 或手機與您確認製作細節。</p>
      </header>

      <form onSubmit={submit} className="request-form">
        <section className="form-section">
          <div className="section-heading"><span>01</span><div><h2>申請人資料</h2><p>我們會透過以下方式與您聯繫。</p></div></div>
          <div className="field-grid">
            <label>單位<input required name="department" placeholder="例如：教務處／護理學系" /></label>
            <label>姓名<input required name="name" placeholder="請輸入姓名" /></label>
            <label>職稱<input required name="title" placeholder="例如：教師、行政人員" /></label>
            <label>手機<input required name="phone" type="tel" placeholder="0912-345-678" /></label>
            <label className="wide">Email<input required name="email" type="email" placeholder="name@example.edu.tw" /></label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading"><span>02</span><div><h2>製作需求</h2><p>可複選；依所選服務補充必要規格。</p></div></div>
          <label className="wide">製作物名稱<input required name="projectName" placeholder="例如：114 學年度招生海報" /></label>
          <div className="service-options">{services.map((service) => <label className={`service-option ${selectedServices.includes(service) ? "selected" : ""}`} key={service}><input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} /><span>{service}</span></label>)}</div>
          {notice && <p className="notice" role="alert">{notice}</p>}
        </section>

        {showsOutput && <section className="form-section output-section">
          <div className="section-heading"><span>03</span><div><h2>輸出規格</h2><p>請依需要選擇尺寸及填寫數量。</p></div></div>
          <div className="spec-grid">
            <fieldset><legend>一般列印</legend><div className="check-list">{printSizes.map((size) => <label key={size}><input type="checkbox" name="printSize" value={size}/>{size}</label>)}</div><label className="compact">張數<input type="number" min="1" placeholder="0" /></label></fieldset>
            <fieldset><legend>大片輸出</legend><div className="check-list">{largeSizes.map((size) => <label key={size}><input type="checkbox" name="largeSize" value={size}/>{size}</label>)}</div><label className="compact">張數<input type="number" min="1" placeholder="0" /></label></fieldset>
            <fieldset><legend>照片輸出</legend><div className="check-list">{photoSizes.map((size) => <label key={size}><input type="checkbox" name="photoSize" value={size}/>{size}</label>)}</div><label className="compact">張數<input type="number" min="1" placeholder="0" /></label></fieldset>
          </div>
        </section>}

        <section className="form-section">
          <div className="section-heading"><span>{showsOutput ? "04" : "03"}</span><div><h2>補充說明</h2><p>請註明預計使用日期、交期或其他製作需求。</p></div></div>
          <label className="wide">需求說明<textarea name="notes" rows={5} placeholder="例如：預計於 9/1 使用，請於 8/25 前完成；需提供可編輯原始檔。" /></label>
          <label className="wide upload"><span>附件上傳 <em>（原型版暫不儲存檔案）</em></span><input type="file" multiple /><small>可先選擇檔案確認流程；正式版本將支援 PDF、Word、PowerPoint、圖片與壓縮檔。</small></label>
        </section>
        <div className="form-footer"><p>送出前請再次確認聯絡資料與交期。送出後將收到案件確認信。</p><button type="submit">送出製作申請 <span>→</span></button></div>
      </form>
    </main>
  );
}
