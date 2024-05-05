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
}) => {
    const classes = errors[name]
        ? "appearance-none rounded-lg text-sm  px-3 pr-4 py-2 placeholder-gray-500 text-gray-900 focus:outline-none ring-1 ring-[#E45555] focus:ring-[#E45555] ring-offset-2 focus-visible:ring-[#E45555] hover:ring-[#E45555]"
        : `appearance-none rounded-lg text-sm  px-3 pr-4 py-2 placeholder-gray-500 text-gray-900  ring-1 ring-[#e5e5e5] ring-offset-2 ${
              isReadOnly
                  ? "cursor-not-allowed"
                  : "focus:outline-none  focus:ring-[#899ada] focus-visible:ring-[#899ada] hover:ring-[#899ada]"
          } w-1/2`;
    const isValid =
        (!errors[name] && String(value)?.length > (length ? length : 2)) ||
        success
            ? "hub-st-check-circle text-checkIcon check-success"
            : "hub-st-check-circle text-checkIcon";

    return (
        <div className="my-1 relative flex justify-end">
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
            {isReadOnly ? (
                <></>
            ) : (
                <>
                    <span className={isValid} />
                    {errors[name] && (
                        <p className="text-xs text-[#E45555] text-left pt-[8px]">
                            {errors[name].message}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Text;
