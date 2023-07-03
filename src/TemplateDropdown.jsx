import React, { useState } from "react";
import "./TemplateDropdown.css";
import { TemplateUI } from "./TemplateUI";

export const TemplateDropdown = ({ templates, onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateChange = (event) => {
    const templateId = event.target.value;
    const template = templates.find((template) => template.id === templateId);
    setSelectedTemplate(template);
  };

  return (
    <div className="template-dropdown-container">
      <select className="template-select" onChange={handleTemplateChange}>
        <option value="">Select a template</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>

      {selectedTemplate && (
        <TemplateUI
          template={selectedTemplate}
          onSelectTemplate={onSelectTemplate}
        />
      )}
    </div>
  );
};
