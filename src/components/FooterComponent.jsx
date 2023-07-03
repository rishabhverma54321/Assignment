export const FooterComponent = ({ component }) => {
  return (
    <div className="component">
      <h3>Footer Component</h3>
      <div className="component-input">
        <label htmlFor="footerText">Text:</label>
        <input
          type="text"
          id="footerText"
          name="footerText"
          value={component.text}
          disabled
        />
      </div>
    </div>
  );
};
