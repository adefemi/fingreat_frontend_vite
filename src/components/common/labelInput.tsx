import { cn } from "@/lib/utils";
import { SelectItemsType } from "@/utils/types";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Textarea, TextareaProps } from "../ui/textarea";

type LabelCustomProps = {
  labelProps: React.ComponentPropsWithoutRef<typeof Label>;
  className?: string;
  children: React.ReactNode;
  id: string;
};

export const LabelCustom: React.FC<LabelCustomProps> = ({
  labelProps: { className: labelClassName, ...labelProps },
  children,
  className: mainClassName,
  id,
}) => {
  return (
    <div className={mainClassName}>
      <Label
        className={cn("mb-3 block font-normal", labelClassName)}
        htmlFor={id}
        {...labelProps}
      />
      {children}
    </div>
  );
};

type LabelInputProps = {
  labelProps: React.ComponentPropsWithoutRef<typeof Label>;
  inputProps: InputProps & { ref?: React.RefObject<HTMLInputElement>};
  className?: string;
  id: string;
};

export const LabelInput: React.FC<LabelInputProps> = ({
  labelProps,
  inputProps: { className, ...inputRest },
  className: mainClassName,
  id,
}) => {
  return (
    <LabelCustom labelProps={labelProps} className={mainClassName} id={id}>
      <Input
        className={`py-6 rounded-md ${className}`}
        id={id}
        {...inputRest}
      />
    </LabelCustom>
  );
};

type LabelTextAreaProps = {
  labelProps: React.ComponentPropsWithoutRef<typeof Label>;
  textAreaProps: TextareaProps;
  className?: string;
  id: string;
};

export const LabelTextArea: React.FC<LabelTextAreaProps> = ({
  labelProps,
  textAreaProps: { className, ...inputRest },
  className: mainClassName,
  id,
}) => {
  return (
    <div className={mainClassName}>
      <Label className="mb-3 block font-bold" htmlFor={id} {...labelProps} />
      <Textarea
        className={`py-6 rounded-xl ${className}`}
        id={id}
        {...inputRest}
      />
    </div>
  );
};

type LabelCheckboxProps = {
  labelProps: React.ComponentPropsWithoutRef<typeof Label>;
  checkboxProps: React.ComponentPropsWithoutRef<typeof Checkbox>;
  className?: string;
  id: string;
};

export const LabelCheckbox: React.FC<LabelCheckboxProps> = ({
  labelProps,
  checkboxProps: { className, ...inputRest },
  className: mainClassName,
  id,
}) => {
  return (
    <div
      className={cn(
        "flex flex-row-reverse items-center gap-2 justify-end",
        mainClassName
      )}
    >
      <Label className="block font-normal" htmlFor={id} {...labelProps} />
      <Checkbox className={className} id={id} {...inputRest} />
    </div>
  );
};

type LabelSelectProps = {
  labelProps: React.ComponentPropsWithoutRef<typeof Label>;
  selectProps: {
    placeholder?: string;
    className?: string;
    items: SelectItemsType[];
    constantValue?: string;
  } & React.ComponentPropsWithoutRef<typeof Select>;
  className?: string;
  id: string;
};

export const LabelSelect: React.FC<LabelSelectProps> = ({
  labelProps,
  selectProps: { className, placeholder, constantValue, items, ...inputRest },
  className: mainClassName,
  id,
}) => {
  return (
    <LabelCustom labelProps={labelProps} className={mainClassName} id={id}>
      <Select {...inputRest}>
        <SelectTrigger className={className} constantValue={constantValue}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item, index) => (
              <SelectItem
                key={index}
                value={item.key}
                title={item.helpText || ""}
              >
                {item.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </LabelCustom>
  );
};
