import PropTypes from 'prop-types';

const Input = ({ title, type = 'text', propName, placeholder = '', value, onChange, ...props }) => {
  const Tag = type === 'textarea' ? 'textarea' : 'input';
  return (<label htmlFor={propName}>
    {title}
    <Tag
      id={propName}
      type={type}
      name={propName}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  </label>)
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  propName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default Input;