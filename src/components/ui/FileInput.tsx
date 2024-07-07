import React from "react";
import { Field, useField } from "formik";
import { Input } from "./input";
import { Label } from "./label";

interface FileInputProps {
  name: string;
  label: string;
  accept: string[];
  maxSize: number;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  label,
  accept,
  maxSize,
}) => {
  const [field, meta, helpers] = useField({
    name,
    validate: (value) => {
      if (!value) {
        return "Veuillez sélectionner un fichier";
      }
      if (value.size > maxSize) {
        return `Le fichier doit être inférieur à ${maxSize / (1024 * 1024)} Mo`;
      }
      if (!accept.includes(value.type)) {
        return `Le fichier doit être au format ${accept.join(", ")}`;
      }
      return undefined;
    },
  });

  const { setValue, setError } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      setValue(file);
      setError(meta.error);
    } else {
      setValue(null);
      setError(meta.error);
    }
  };

  return (
    <div className="col-span-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...field}
        type="file"
        accept={accept.join(",")}
        onChange={handleChange}
      />
      {meta.touched && meta.error && (
        <small className="text-red-500">{meta.error}</small>
      )}
    </div>
  );
};

const FileInputField: React.FC<FileInputProps> = (props) => (
  <Field {...props} component={FileInput} />
);

export default FileInputField;
