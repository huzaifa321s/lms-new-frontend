import React, { useCallback, useEffect, useRef, useState } from 'react';

const extractText = (obj, columns) => {
    let text = ""
    columns.forEach((c, k) => {
        text += obj[c]
        text += k < columns.length - 1 ? " " : ""
    })

    return text;
}

const Search = ({ labelClass, searchBoxClass, url, placeholder, selectLabel, column, columns, additionalConditions, crossBtn, selectAction, multipleSelect, initialObj, initialObjArr, disabled, setResetFlag, resetFlag }) => {


    const dropdownRef = useRef(null);
    const searchBoxRef = useRef(null)
    const recentSelectionRef = useRef(false);

    const [loading, setLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

    const [arr, setArr] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [singleSelect, setSingleSelect] = useState(initialObj || null);
    const [multipleSelectArr, setMultipleSelectArr] = useState(initialObjArr || []);



    let filteredArr = [];
    if (multipleSelect) {
        filteredArr = arr?.filter(u => !multipleSelectArr.some(mu => mu._id === u._id));
    } else {
        filteredArr = [...arr];
    }



    const handleChange = (e) => {
        setHighlightedIndex(-1);
        setInputValue(e.target.value);
    };


    const handleClickOutside = useCallback((e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            const isOutsideLabelElement = e.target.closest(`.${labelClass}`) === null;
            const isOutsideSearchBox = e.target.closest(`.${labelClass}`) === null;

            if (isOutsideLabelElement && isOutsideSearchBox) {
                setArr([]);
                setSearchBoxVisibility(false)
            }
        }
    }, [labelClass]);


    const select = (obj) => {
        if (multipleSelect) {
            setMultipleSelectArr(prevArr => [...prevArr, obj]);
            selectAction([...multipleSelectArr, obj]);

            setInputValue('');
            setArr([]);

        } else {
            selectAction(obj)
            setSingleSelect(obj)

            setInputValue('')
            setArr([]);
        }
        recentSelectionRef.current = true;
    }


    const deselectItem = (itemToRemove) => {
        if (multipleSelect) {
            const updatedArr = multipleSelectArr.filter(obj => obj._id !== itemToRemove._id);
            setMultipleSelectArr(updatedArr);
            selectAction(updatedArr);
            if (updatedArr.length === 0) {
                setSearchBoxVisibility(false);
            }
        }
    }

    const arrowEvents = (e) => {
        if (e.key === 'ArrowDown') {
            if (highlightedIndex < filteredArr.length - 1) {
                setHighlightedIndex(highlightedIndex + 1)
            } else if (highlightedIndex === filteredArr.length - 1) {
                setHighlightedIndex(0);
            }
        } else if (e.key === 'ArrowUp') {
            if (highlightedIndex > 0) {
                setHighlightedIndex(highlightedIndex - 1)
            } else if (highlightedIndex === 0) {
                setHighlightedIndex(filteredArr.length - 1);
            }
        } else if (e.key === 'Enter' && (highlightedIndex >= 0 && highlightedIndex < filteredArr.length)) {
            const obj = filteredArr[highlightedIndex]
            select(obj);
        }
    };


    const fetchData = useCallback(async (searchInput) => {
        try {
            setLoading(true);
            let requestObj = {};
            if (additionalConditions && typeof additionalConditions === 'object') {
                requestObj = { ...requestObj, ...additionalConditions };
            }
            if (searchInput.trim() !== '') requestObj = { ...requestObj, searchInput };
            const queryString = new URLSearchParams(requestObj).toString();
            let response = await fetch(`http://localhost:5001/${url}?${queryString}`, {
                method: 'GET', headers: { 'Content-Type': 'application/json' }
            });

            response = await response.json();
            setArr(response.data);
        } catch (error) {
            setArr([]);
        } finally {
            setLoading(false);
        }
    }, [url, additionalConditions]);


    const toggleSearchbox = () => {
        if (disabled) {
            setSearchBoxVisibility(false)
            dropdownRef.current.style.backgroundColor = "#ddd !important";
        } else {
            setSearchBoxVisibility(!searchBoxVisibility)
            dropdownRef.current.style.backgroundColor = "";
        }
    }



    useEffect(() => {
        if (searchBoxVisibility) document.getElementById('search-data').focus();

    }, [searchBoxVisibility]);

    useEffect(() => {
        if (resetFlag) {
            multipleSelect ? setMultipleSelectArr([]) : setSingleSelect(null);
            setResetFlag(false);
        }
    }, [resetFlag, multipleSelect, setResetFlag]);


    useEffect(() => {
        if (!recentSelectionRef.current) {
            fetchData(inputValue);
        }
        recentSelectionRef.current = false;
    }, [inputValue, fetchData]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <>
            <div className="">
                <div className={labelClass} onClick={toggleSearchbox} ref={dropdownRef}>
                    {!multipleSelect ?
                        <div className='form-control' style={disabled ? styles.bgGrey : {}}>
                            {singleSelect ?
                                <> {column ? singleSelect[column] : extractText(singleSelect, columns)}</>
                                :
                                <>{selectLabel || 'Single Select'}</>
                            }
                        </div>
                        :
                        <div className='d-flex flex-wrap gap-2 form-control'>
                            {multipleSelect && multipleSelectArr.length > 0 ?
                                <>
                                    {multipleSelectArr.map((obj, k) => {
                                        const text = column ? obj[column] : extractText(obj, columns);
                                        return (
                                            <div key={k} className='border border-1 rounded p-1 d-flex gap-2' style={styles.bgGrey} onClick={(e) => e.stopPropagation()} >
                                                {text} {crossBtn && <span onClick={() => deselectItem(obj)} style={styles.cross} className="badge bg-light text-dark">x</span>}
                                            </div>
                                        );
                                    })}
                                </>
                                :
                                <>{selectLabel || 'Multiple Select'}</>
                            }</div>
                    }
                </div>




                {searchBoxVisibility && <div className={searchBoxClass} style={styles.searchBox} ref={searchBoxRef}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder || "Search..."}
                        id="search-data"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={arrowEvents}
                        onFocus={() => fetchData('')}
                    />

                    {loading && <div style={{ backgroundColor: "#fff" }}>Loading..</div>}

                    {filteredArr.length > 0 ? (
                        <div style={styles.dropDownStyle} className='border border-1 rounded'>
                            {filteredArr.map((obj, k) => {
                                const text = column ? obj[column] : extractText(obj, columns);
                                return (
                                    <div
                                        key={k}
                                        className='p-1'
                                        onClick={() => select(obj)}
                                        onMouseEnter={() => setHighlightedIndex(k)}
                                        style={{ ...styles.dropDownListStyles, backgroundColor: highlightedIndex === k ? '#e7e7e7' : '' }}
                                    >
                                        {text}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div style={styles.dropDownStyle} className='border border-1 rounded'>
                            <div className='p-1'>
                                No record found!
                            </div>
                        </div>
                    )}

                </div>}
            </div>
        </>
    );
};



const styles = {
    searchBox: { position: "absolute" },
    dropDownListStyles: {},
    dropDownStyle: { borderColor: "#ddd", backgroundColor: "#fff" },
    bgGrey: { backgroundColor: "#ddd" },
    cross: { backgroundColor: "#ddd", cursor: 'pointer' },
    selectedField: { minHeight: "40px" }
}


export default Search;