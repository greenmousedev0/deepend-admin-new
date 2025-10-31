import React, { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SimpleCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="space-x-2">
        <input type="checkbox" className="checkbox" ref={ref} {...props} />
        {label && <label htmlFor={props.id}>{label}</label>}
      </div>
    );
  },
);

export default SimpleCheckbox;
