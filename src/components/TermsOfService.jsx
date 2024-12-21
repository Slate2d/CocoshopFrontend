import React from 'react';
import '../css/terms.css';
const TermsPage = () => {
  return (
    <div className="terms-page">
      <div className="content">
        <Section title="Условия сервиса" />
        <Section title="Условия доставки" />
        <Section title="Условия возврата" />
      </div>
    </div>
  );
};

const Section = ({ title }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <p>
        Задача организации, в особенности же курс на социально-ориентированный национальный проект требует от нас системного анализа модели развития! Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует от нас анализа системы масштабного изменения ряда параметров! С другой стороны социально-экономическое развитие напрямую зависит от всесторонне сбалансированных нововведений?
      </p>
    </div>
  );
};

export default TermsPage;
