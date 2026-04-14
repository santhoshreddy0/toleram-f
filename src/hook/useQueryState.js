import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function useQueryState(key, defaultValue = "", delay = 500) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get(key);
  const [value, setValue] = useState(paramValue || defaultValue);
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Step 1: debounce the value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  // Step 2: sync debounced value → URL
  useEffect(() => {
    const current = searchParams.get(key);

    if (debouncedValue !== current) {
      const newParams = new URLSearchParams(searchParams);

      if (debouncedValue) {
        newParams.set(key, debouncedValue);
      } else {
        newParams.delete(key);
      }

      setSearchParams(newParams, { replace: true });
    }
  }, [debouncedValue]);

  // Step 3: sync URL → state (back/forward support)
  useEffect(() => {
    if (paramValue !== value) {
      setValue(paramValue || "");
    }
  }, [paramValue]);

  return [value, setValue];
}