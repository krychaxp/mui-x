import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import {
  PickersPopper,
  ExportedPickerPopperProps,
  ExportedPickerPaperProps,
} from '../PickersPopper';
import { DateInputPropsLike } from './WrapperProps';
import { PickerStateWrapperProps } from '../../hooks/usePickerState';

export interface DesktopWrapperProps extends ExportedPickerPopperProps, ExportedPickerPaperProps {
  children?: React.ReactNode;
}

export interface InternalDesktopWrapperProps extends DesktopWrapperProps, PickerStateWrapperProps {
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  KeyboardDateInputComponent: React.JSXElementConstructor<
    DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> }
  >;
}

export function DesktopWrapper(props: InternalDesktopWrapperProps) {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent,
    onDismiss,
    onCancel,
    open,
    PopperProps,
    PaperProps,
    TransitionComponent,
    onClear,
    clearText,
    clearable,
  } = props;
  const ownInputRef = React.useRef<HTMLInputElement>(null);
  const inputRef = useForkRef(DateInputProps.inputRef, ownInputRef);

  return (
    <WrapperVariantContext.Provider value="desktop">
      <KeyboardDateInputComponent {...DateInputProps} inputRef={inputRef} />
      <PickersPopper
        role="dialog"
        open={open}
        anchorEl={ownInputRef.current}
        TransitionComponent={TransitionComponent}
        PopperProps={PopperProps}
        PaperProps={PaperProps}
        onClose={onDismiss}
        onCancel={onCancel}
        onClear={onClear}
        clearText={clearText}
        clearable={clearable}
      >
        {children}
      </PickersPopper>
    </WrapperVariantContext.Provider>
  );
}
