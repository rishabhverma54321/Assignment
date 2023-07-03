export const HeaderComponent = ({
  format,
  placeholders,
  handleInputChange
}) => {
  return (
    <div className="component">
      <h3>Header Component</h3>
      <div className="component-input">
        <label htmlFor="headerFormat">Format:</label>
        <input
          type="text"
          id="headerFormat"
          name="headerFormat"
          value={format}
          disabled
        />
      </div>
      {placeholders &&
        placeholders.map((placeholder, index) => (
          <div className="component-input" key={index}>
            <label htmlFor={`headerPlaceholder${index}`}>
              Placeholder {index + 1}:
            </label>
            <input
              type="text"
              id={`headerPlaceholder${index}`}
              name={`headerPlaceholder${index}`}
              value={placeholder}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        ))}
    </div>
  );
};
