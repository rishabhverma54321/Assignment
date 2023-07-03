export const BodyComponent = ({
  text,
  placeholders = [],
  handleInputChange
}) => {
  return (
    <div className="component">
      <h3>Body Component</h3>
      <div className="component-input">
        <label htmlFor="bodyText">Text:</label>
        <textarea id="bodyText" name="bodyText" value={text} disabled />
      </div>
      {placeholders.map((placeholder, index) => (
        <div className="component-input" key={index}>
          <label htmlFor={`bodyPlaceholder${index}`}>
            Placeholder {index + 1}:
          </label>
          <input
            type="text"
            id={`bodyPlaceholder${index}`}
            name={`bodyPlaceholder${index}`}
            value={placeholder}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      ))}
    </div>
  );
};
