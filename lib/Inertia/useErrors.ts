import { useState, useEffect, useCallback } from 'react';
import { forEach } from 'lodash';
import usePage from './usePage';

export default function useErrors() {
  const page = usePage();
  const { errors } = page.props;
  const makeErrs = useCallback(() => {
    const e: Record<string, string> = {};
    forEach(errors, (value, key) => {
      // name.0, name.1 throws by laravel arrays validation
      const endOfString = key.includes('.') ? key.indexOf('.') : key.length;
      const realKey = key.substring(0, endOfString);

      e[realKey] = value;
    });

    return e;
  }, [errors]);
  const [errs, setErrs] = useState<Record<string, string>>(makeErrs());

  useEffect(() => {
    const newErrs = makeErrs();
    setErrs(newErrs);
  }, [makeErrs]);

  return [errs, setErrs] as const;
}
