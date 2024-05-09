import { ListSubheader, ListSubheaderProps } from '@mui/material';

function SelectSubheader(props: ListSubheaderProps) {
    return <ListSubheader {...props} style={{ fontWeight: 600, color: 'darkgray' }} />;
}

SelectSubheader.muiSkipListHighlight = true;
export default SelectSubheader;
