import {makeStyles} from '@material-ui/core/styles';
import {AppTheme} from "types/AppContextPropsType";

const useStyles = makeStyles((theme: AppTheme) => {
    return {
        FilterContainer: {
            display: 'flex',

            flexDirection: 'column',
            alignItems: 'flex-start',
            width: "100%",
            padding: 4
        },
        mainFilter: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        secondaryFilter: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        mainFilter_filter: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        action: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        root: {
            fontSize: 14,
            minHeight: "36px",
            maxHeight: "36px",
        },
        textField: {
            padding: "5px",

            "& .MuiInputBase-input": {
                height: 20,
                "&.Mui-focused ": {
                    backgroundColor: "#ebebeb",
                },
            },
            "&:hover": {
                backgroundColor: "#ebebeb",
            },
            "& .MuiOutlinedInput-input": {
                padding: 8,
                fontFamily: 'Poppins,sans-serif',
                fontWeight: 400,
                fontSize: 14,
            },
            "& .MuiInputLabel-outlined": {
                transform: 'translate(14px, 5px) scale(1)'
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                transform: 'translate(14px, -6px) scale(0.75)'
            },
        },
        spreadBox: {
            display: 'flex',
            alignItems: "center",
            width: '100%',
            height: 40,
        },
        buttonFind: {
            backgroundColor: "blanchedalmond",
            width: "128px",
            height: "39px",
            borderRadius: "6px",
            border: "2px solid #d6b656" /* Green */,
            padding: 3,
            "& .MuiButton-label": {
                height: 14
            }
        },
        expand: {
            display: 'flex',
            alignItems: 'center',
            background: '#FFFFFF',
            justifyContent: 'center',
            border: '1px dashed #003af9',
            boxSizing: 'border-box',
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
            borderRadius: 4,
            height: 36,
            width: 26,
            padding: 4,
            minWidth: 20,
            margin: 8,
            backgroundColor: "#ffffff",

        },
        hover: {
            "& .MuiInputBase-input": {
                minHeight: 20,
                //minWidth: 200,
                maxWidth: 400,
                "&.Mui-focused ": {
                    backgroundColor: "#ebebeb",

                },
            },
            "&:hover": {
                backgroundColor: "#ebebeb",
            },
            "& .MuiOutlinedInput-input": {
                padding: 4,
            },
            "& .MuiInputLabel-outlined": {
                transform: 'translate(14px, 7px) scale(1)'
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                transform: 'translate(14px, -6px) scale(0.75)',
                color: "#3569a8",
                fontWeight: "bold",
            },
        },
        autocomplete: {
            '& .MuiAutocomplete-input': {
                padding: "5px !important",
            },
            '& .MuiInputBase-root': {
                padding: "0px !important",
                height:28,
                width:400
            },


        },
        reset: {
            display: 'flex',
            alignItems: 'center',
            background: '#FFFFFF',
            justifyContent: 'center',
            border: '1px dashed #003af9',
            boxSizing: 'border-box',
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
            borderRadius: 4,
            height: 36,
            width: 26,
            padding: 4,
            minWidth: 20,
            margin: 8,
            backgroundColor: "#ffffff",

        },
        filterContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0px 8px 0px 8px',
            minHeight: 57
        },
        filterContainer_form: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        filterContainer_action: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '20%'
        },
        filterContainer_form_element: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: "80%",
            paddingTop: 4,
            paddingBottom: 4
        },
        progress: {
            display: 'flex',
            marginRight: '16px',
            alignItems: 'center',
            marginTop: '4px',
            width: '100%',
            justifyContent: 'flex-end',
            height: 46
        },
    };
});
export default useStyles;
