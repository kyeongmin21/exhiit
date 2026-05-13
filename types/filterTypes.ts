export interface FilterBoxProps {
    selectedRegion: string;
    startDate: string;
    endDate: string;
    onRegionChange: (region: string) => void;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
}
