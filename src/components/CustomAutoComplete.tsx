import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { AutoCompleteList } from "./AddCourse";
interface CustomAutoCompleteProps {
  label: string;
  data: any[];
  isLabelShrink?: boolean;
  value?: any;
  setValue?: Function;
  isError?: boolean;
}
export default function CustomAutoComplete({
  label,
  data,
  isLabelShrink,
  value,
  setValue,
  isError
}: CustomAutoCompleteProps) {
  const [selected, setSelected] = useState<AutoCompleteList | string>("");
  const handleChange = (e: any, newValue: AutoCompleteList) => {
    console.log(e, newValue);
    setSelected(newValue);
    setValue && setValue(newValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      let select = data.find((item) => item.id === value);
      setSelected(select);
    }
  }, [value, data]);
  return (
    <Autocomplete
      dir="rtl"
      onChange={handleChange}
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => (option ? option.value : "")}
      value={selected}
      renderInput={(params) => (
        <>
          {isLabelShrink ? (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}

              label={label}
              variant="outlined"
            />
          ) : (
              <TextField {...params} error={isError && !selected}
                helperText={isError && !selected ? `${label} חובה` : ""} label={label} variant="outlined" />
            )}
        </>
      )}
    />
  );
}
