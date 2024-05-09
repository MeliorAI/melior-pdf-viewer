import { InputAdornment, ListSubheader, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import Flex from 'styled-flex-component';
import { useDocumentTypes } from '../../../hooks/useDocumentTypes';
import Container from '../Common/Container';
import { Text } from '../Typography';
import {
    StyledDocumentsTypeMenuItem,
    StyledDocumentTypeSelector,
} from './DocumentTypeSelector.styled';
import Loading from '../Common/Loading';
import { SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { StyledSearchTextField } from '../../AdvancedSearch/SearchSectionInput/StyledTextField';
import { MeliorTranslate } from '../../MeliorTranslate';

interface IDocumentsTypeFilterSelectProps {
    selectedType: string;
    isATableFilter?: boolean;
    customStyles?: SxProps;
    setSelectedType: (type: string) => void;
}

const DocumentsTypeSelector = ({
    selectedType,
    isATableFilter = false,
    customStyles,
    setSelectedType,
}: IDocumentsTypeFilterSelectProps) => {
    const [searchText, setSearchText] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value as string);
    };

    const { docTypes, isLoading } = useDocumentTypes();

    const containsText = (text, searchText) =>
        text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

    const displayedOptions = useMemo(
        () => docTypes && docTypes.filter((option) => containsText(option, searchText)),
        [isLoading, searchText]
    );

    if (isLoading) {
        return (
            <div style={{ marginRight: '10px' }}>
                <Loading message="Loading types" marginTop="10px" />
            </div>
        );
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <Flex alignCenter>
                {isATableFilter && (
                    <Container rightOuterSpacing={0.875}>
                        <Text color="rgba(0, 0, 0, 0.6);">
                            <MeliorTranslate valueKey="Document Type" />
                        </Text>
                    </Container>
                )}
                <FormControl fullWidth>
                    <StyledDocumentTypeSelector
                        id="type-filter-select"
                        value={Boolean(selectedType) ? selectedType : 'All'}
                        onChange={handleChange}
                        sx={customStyles}
                        onClose={() => setSearchText('')}
                    >
                        <ListSubheader>
                            <StyledSearchTextField
                                size="small"
                                autoComplete="off"
                                placeholder="Start typing"
                                fullWidth
                                sx={{
                                    background: 'rgba(0, 0, 0, 0.06)',
                                }}
                                value={searchText}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key !== 'Escape') {
                                        // Prevents autoselecting item while typing (default Select behaviour)
                                        e.stopPropagation();
                                    }
                                }}
                            />
                        </ListSubheader>
                        {isATableFilter && (
                            <StyledDocumentsTypeMenuItem key="Select" value="All">
                                All
                            </StyledDocumentsTypeMenuItem>
                        )}
                        {Boolean(displayedOptions?.length) &&
                            displayedOptions.map((filter) => (
                                <StyledDocumentsTypeMenuItem key={filter} value={filter}>
                                    {filter}
                                </StyledDocumentsTypeMenuItem>
                            ))}
                    </StyledDocumentTypeSelector>
                </FormControl>
            </Flex>
        </Box>
    );
};

export default DocumentsTypeSelector;
