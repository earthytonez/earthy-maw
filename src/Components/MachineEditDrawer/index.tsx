import * as React from "react";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { CssVarsProvider } from "@mui/joy/styles";

// custom
import filesTheme from "../../theme.ts";
// import Navigation from './components/Navigation';

import { useStore } from "../../stores/useStore.tsx";
import { useUIStore } from "../../stores/UI/useUIStore.tsx";
import { observer } from "mobx-react-lite";

import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
type Anchor = "top" | "left" | "bottom" | "right";

const MachineEditDrawerRadioGroup = observer(({edit, name, field, fieldOptions}: {edit: Function, name: string, field: string, fieldOptions: any}) => {
  if (!fieldOptions) {
    return (
      <Box sx={{ mt: 2 }}></Box>);
  }

  const { options, current } = fieldOptions;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography>{name}</Typography>
      <RadioGroup name={field} defaultValue={current} onChange={(event) => { console.log((event.target as HTMLInputElement).value); edit(field, (event.target as HTMLInputElement).value)}}>
        {options.map((option: any, i: number) => {
          console.log(i);
          return (<Radio key={i} label={option} value={option} size="sm" />);
        })}
      </RadioGroup>
    </Box>
  );
});

const LoadParameter = observer(({edit, name, field, fieldType, fieldOptions}: { edit: Function, name: string, field: string, fieldType: string, fieldOptions: any}) => {
  console.log("Return fieldType");
  switch(fieldType) {
    case 'radio':
      return (<MachineEditDrawerRadioGroup name={name} field={field} fieldOptions={fieldOptions} edit={edit}></MachineEditDrawerRadioGroup>);
    default:
      return <Box></Box>;
  }
});

const MachineEditDrawer = observer(() => {
  const store = useStore();
  const uiStore = useUIStore();

  const { toggleObjectEdit, objectEditTrack, objectEditType, objectEditIsOpen, objectEditing } = uiStore;

  let anchor = "right";
  console.log(uiStore);
  console.log(uiStore.objectEditIsOpen);

  let editParameters = [];
  let editParameter = () => {};
  if (objectEditIsOpen) {
    editParameters = store.trackStore.tracks[objectEditTrack][objectEditType].editParameters();
    editParameter = store.trackStore.tracks[objectEditTrack][objectEditType].changeParameter;
  }
  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <Drawer anchor={anchor} open={uiStore.objectEditIsOpen} sx={{p: 4}}>
        <Button onClick={() => toggleObjectEdit(false)}>
          <CloseIcon fontSize="small" />
        </Button>
          {editParameters.map((parameter: any, key: number) => {
            return (<LoadParameter key={key} edit={editParameter} name={parameter.name} field={parameter.field} fieldType={parameter.fieldType} fieldOptions={parameter.fieldOptions}/>);
          })}
        
      </Drawer>
    </CssVarsProvider>
  );
});

export default MachineEditDrawer;
