import React, { useState, useEffect } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const options = ['Pending', 'Published', 'Rejected'];
  const [selectedValues, setSelectedValues] = useState(options); // Initialize with all options

  useEffect(() => {
    // Initial filter call with all options selected
    onFilterChange(selectedValues);
  }, []);

  const handleCheckboxChange = (e, { value }) => {
    let newSelectedValues;
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((item) => item !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }
    setSelectedValues(newSelectedValues);
    onFilterChange(newSelectedValues);
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