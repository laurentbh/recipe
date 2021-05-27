import { ChangeEvent, FocusEvent, useState } from "react";

const TimeInput = () => {
  // from https://dev.to/andrewchmr/react-hh-mm-ss-time-input-cfl
  const [value, setValue] = useState("0:00");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const minutes = Math.max(0, getMinutesFromHHMM(value));

    const time = toHHMM(minutes);
    setValue(time);
  };

  const getMinutesFromHHMM = (value: string): number => {
    const [str1, str2] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);


    if (!isNaN(val1) && isNaN(val2)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2)) {
      return val1 * 60 + val2;
    }

    return 0;
  };

  const toHHMM = (min: number): string => {
    const minNum = parseInt(min.toString(), 10);
    const hours = Math.floor(minNum / 60);
    const minutes = minNum % 60;

    return [hours, minutes]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  return (
    <div>
      <input type="text" onChange={onChange} onBlur={onBlur} value={value} />{' '}⏳
    </div>
  );
};

export default TimeInput
