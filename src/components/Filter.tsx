import React, {useContext} from 'react';
import {Context} from '../context/context';
import {FormFieldEvent} from '../dataStructure';

export const Filter: React.FC = () => {
  const {
   filterFields,
   setFieldValue,
   setCurPage
  } = useContext(Context);

  const handleChange = (event: FormFieldEvent) => {
    event.preventDefault();

    setFieldValue({
      'fieldKey': event.target.id.slice(7),
      'fieldValue': event.target.value
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurPage(1);
  }

  return (
    <form
      className="row my-5"
      onSubmit={handleSubmit}
    >
      {Object.values(filterFields).map(field => (
        <div className="col-12 col-md mb-2 mb-md-0" key={field.key}>
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor={'filter-'+field.key}>{field.fieldName}</label>
            </div>
            {field.type === 'input'
              ? <input
                  type="text"
                  className="form-control"
                  id={'filter-'+field.key}
                  value={field.curValue}
                  onChange={handleChange}
                />
              : <select
                  className="custom-select"
                  id={'filter-'+field.key}
                  value={field.curValue}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  {field.values.map(value => (
                    <option value={value} key={value}>{value}</option>
                  ))}
                </select>
            }
          </div>
        </div>
      ))}
      <div className="col-auto mt-3 mt-md-0">
        <div className="input-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Filter resources"
          />
        </div>
      </div>
    </form>
  );
};
