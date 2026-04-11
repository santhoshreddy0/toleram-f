import React from "react";
const Text = ({
  id,
  name,
  register,
  value,
  errors,
  onChange,
  placeholder,
  options,
  type,
  isReadOnly,
  success,
  length,
  className,
}) => {
  const baseClasses =
    "appearance-none w-full rounded-lg px-3 pr-4 py-2 text-sm placeholder-gray-500 ring-1 ring-offset-2";

  const classes = errors[name]
    ? `${baseClasses} text-gray-900 focus:outline-none ring-[#E45555] focus:ring-[#E45555] focus-visible:ring-[#E45555] hover:ring-[#E45555] ${
        className ? className : ""
      }`
    : `${baseClasses} text-gray-900 ring-[#e5e5e5] ${
        isReadOnly
          ? "cursor-not-allowed"
          : "focus:outline-none  focus:ring-[#899ada] focus-visible:ring-[#899ada] hover:ring-[#899ada]"
      } ${className ? className : ""}`;
  const isValid =
    (!errors[name] && String(value)?.length > (length ? length : 2)) || success
      ? "hub-st-check-circle text-checkIcon check-success"
      : "hub-st-check-circle text-checkIcon";

  return (
    <div className="my-1 relative justify-end w-full">
      <input
        id={id}
        {...register(name, options)}
        className={classes}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
        readOnly={isReadOnly}
      />

        <>
          <span className={isValid} />
          {errors[name] && (
            <p className="text-xs text-[#E45555] text-left pt-[8px]">
              {errors[name].message}
            </p>
          )}
        </>
    </div>
  );
};

export default Text;
