import React from 'react';

const HiddenMessage: React.FC = ({ children }) => {
  const [showMessage, setShowMessage] = React.useState(false);
  return (
    <div>
      <label htmlFor="toggle">
        Show Message
        <input id="toggle" type="checkbox" onChange={(e) => setShowMessage(e.target.checked)} checked={showMessage} />
      </label>
      {showMessage ? children : null}
    </div>
  );
};

export default HiddenMessage;
