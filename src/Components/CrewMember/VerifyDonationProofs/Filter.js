import React, { useState } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const options = ['Pending', 'Rejected', 'Accepted'];

  const handleCheckboxChange = (e, { value }) => {
    let newSelectedValues;
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((item) => item !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }
    setSelectedValues(newSelectedValues);
    if (onFilterChange) {
      onFilterChange(newSelectedValues);
    }
  };

  return (
    <div className="crew-filter-container">
      <Form>
        <Form.Group inline>
          <label>Status:</label>
          {options.map((option) => (
            <Form.Field key={option}>
              <Checkbox
                label={option}
                name="status"
                value={option}
                checked={selectedValues.includes(option)}
                onChange={handleCheckboxChange}
              />
            </Form.Field>
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Filter;
