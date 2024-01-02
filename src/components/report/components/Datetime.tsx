import React from "react";
import { useAppSelector } from "../../../store";
import { InputField } from "../../Form";
import { stringRequired } from "../../Form/validation";
import { FormColumn } from "../styles";

export function Datetime() {
  const datetimeFromImage = useAppSelector(
    (state) => state.report.form.datetime.value,
  );
  const datetimeFromReport = useAppSelector((state) => state.report.app.date);

  return (
    <FormColumn>
      <InputField
        handleChange={() => console.log("hello")}
        contentData={{
          defaultValue: datetimeFromImage || datetimeFromReport,
          id: "datetime",
          type: "datetime-local",
          label: "Data i czas zgłoszenia",
          name: "datetime",
          validate: stringRequired,
        }}
      />
    </FormColumn>
  );
}
