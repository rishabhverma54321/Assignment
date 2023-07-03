import React, { useState, useEffect } from "react";
import { BodyComponent } from "./components/BodyComponent";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponent } from "./components/HeaderComponent";

export const TemplateUI = ({ template, onSelectTemplate }) => {
  const [placeholderValues, setPlaceholderValues] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (template && template.components) {
      setPlaceholderValues(Array(template.components.length).fill(""));
    }
  }, [template]);

  const handlePlaceholderChange = (event, index) => {
    const value = event.target.value;
    const newPlaceholderValues = [...placeholderValues];
    newPlaceholderValues[index] = value;
    setPlaceholderValues(newPlaceholderValues);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const hasEmptyPlaceholder = placeholderValues.some((value) => !value);
    if (hasEmptyPlaceholder) {
      setError("Please fill in all the placeholders.");
      return;
    }

    const headerComponent = template.components.find(
      (component) => component.type === "HEADER"
    );
    if (
      headerComponent &&
      ["DOCUMENT", "IMAGE", "VIDEO"].includes(headerComponent.format) &&
      !file
    ) {
      setError("Please upload a file.");
      return;
    }

    const finalJson = {
      template: {
        namespace: "c928ea93_3b01_4be7_8102_4930471e333b",
        name: template.name,
        language: {
          policy: "deterministic",
          code: template.language
        },
        components: template.components.map((component, index) => {
          if (component.type === "BODY") {
            return {
              type: component.type,
              parameters: component.text.split(" ").map((placeholder, i) => ({
                type: "text",
                text: placeholderValues[i]
              }))
            };
          }

          if (component.type === "HEADER") {
            if (
              ["DOCUMENT", "IMAGE", "VIDEO"].includes(component.format) &&
              file
            ) {
              return {
                type: component.type,
                parameters: [
                  {
                    type: component.format.toLowerCase(),
                    [component.format.toLowerCase()]: {
                      link: URL.createObjectURL(file)
                    }
                  }
                ]
              };
            }

            return {
              type: component.type,
              parameters: []
            };
          }

          return {
            type: component.type,
            parameters: [
              {
                type: "text",
                text: component.text
              }
            ]
          };
        })
      }
    };

    console.log(finalJson);
  };

  if (!template) {
    return null;
  }

  return (
    <div className="template-ui">
      <form className="template-form" onSubmit={handleFormSubmit}>
        {template.components.map((component, index) => (
          <div key={index} className="template-component">
            {component.type === "HEADER" && (
              <HeaderComponent
                format={component.format}
                placeholders={component.placeholders}
                handleInputChange={(event) =>
                  handlePlaceholderChange(event, index)
                }
              />
            )}
            {component.type === "BODY" && (
              <BodyComponent
                text={component.text}
                placeholders={component.placeholders}
                handleInputChange={(event) =>
                  handlePlaceholderChange(event, index)
                }
              />
            )}
            {component.type === "FOOTER" && (
              <FooterComponent component={component} />
            )}
          </div>
        ))}

        <button className="template-submit" type="submit">
          Submit
        </button>
      </form>

      {error && <div className="template-error">{error}</div>}
    </div>
  );
};
