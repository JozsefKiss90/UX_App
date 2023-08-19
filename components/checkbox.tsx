// components/Checkbox.js
import classes from './Checkbox.module.css';
import resets from './_resets.module.css';

const Checkbox = ({ className, isChecked, onChange }) => (
  <input
    className={`${resets.storybrainResets} ${className} `}
    type="checkbox"
    checked={isChecked}
    onChange={onChange} 
/>
);

export default Checkbox;
