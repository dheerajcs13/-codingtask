import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _forEach from 'lodash/forEach';
import _head from 'lodash/head';
import _last from 'lodash/last';
import _range from 'lodash/range';
import _join from 'lodash/join';
import _isEmpty from 'lodash/isEmpty';
import _includes from 'lodash/includes';
import _split from 'lodash/split';
import './rangeInput.css';

const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ','];
const values = ["5000"];

const hasRange = (value) => _includes(value, '-');

class RangeInput extends React.PureComponent {
  state = {
    inputValue: '',
    addedNumbers: values,
    duplicateNumber: [],
  }

  handleChange = (evt) => {
    const event = evt;
    const value = _get(event, 'key');
    const validValue = _includes(keys, value);
    if(validValue) {
      this.setState((state) => ({
        inputValue: state.inputValue + value
      }), () => {
        const { duplicateNumber } = this.getFilteredNumbers();
        const errorString = _isEmpty(duplicateNumber) ? '' : `Duplicate numbers ${_join(duplicateNumber, ',')}`
        this.setState({errorString});
      })
    }
    if(value === 'Enter') {
      const { numbersToAdd, duplicateNumber } = this.getFilteredNumbers();
      this.setState((state) => ({
        inputValue: '',
        errorString: '',
        addedNumbers: [ ...state.addedNumbers, ...numbersToAdd],
        duplicateNumber: [ ...state.duplicateNumber, ...duplicateNumber]
      }))
    }
  }


addNumber = (acc, number) => {
  const { addedNumbers, duplicateNumber } = this.state;
  if(!_includes(addedNumbers, number)) {
    acc.numbersToAdd.push(number)
  } else if (!_includes(duplicateNumber, number)) {
    acc.duplicateNumber.push(number)
  }
  return acc;
}

  getFilteredNumbers = () => {
    const { inputValue } = this.state;
    const inputNumbers = _split(inputValue, ',');
    return _reduce(inputNumbers, (acc, number) => {
      if(number && !hasRange(number)){
        this.addNumber(acc, +number)
        return acc;
      } else {
        const range = _split(number, '-');
        const rangenumbers = _range(_head(range), +_last(range)+1);
        _forEach(rangenumbers, (num) => {
          this.addNumber(acc, +num)
        })
        return acc;
      }
    }, {
      duplicateNumber: [],
      numbersToAdd: [],
    });
  }
 
  render() {
    const { inputValue, addedNumbers, errorString } = this.state;
    return (
      <div className="rangeInput">
        <input
          readOnly
          value={inputValue}
          onKeyPress={this.handleChange}
        />
        <div className="duplicate">{errorString}</div>
        <div className="output">
        <ul className="added">
          <li>Added</li>
          {_map(addedNumbers, number => <li key={number}>{number}</li>)}
        </ul>
        </div>
      </div>
    );
  }
}

export default RangeInput;
