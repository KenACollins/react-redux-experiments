import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoSearch, IoClose } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useDebounce } from 'src/hooks/debounceHook';
import axios from 'axios';
import { TVShow } from 'src/components/TVShow';

const SearchBarContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 3.8em;
    background-color: #FFF;
    border-radius: 6px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
    width: 100%;
    min-height: 4em;    // Needs to be taller than StyledSearchBar to cover it.
    display: flex;
    align-items: center;
    position: relative;
    padding: 2px 15px;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 21px;
    color: #12112E;
    font-weight: 500;
    border-radius: 6px;
    background-color: transparent;

    &:focus {
        outline: none;

        &::placeholder {
            opacity: 0;
        }
    }

    &::placeholder {
        color: #BEBEBE; // Faint gray color.
        transition: all 250ms ease-in-out;
    }
`;

const SearchIcon = styled.span`
    color: #BEBEBE;
    font-size: 27px;
    margin-top: 6px;
    margin-right: 10px;
    vertical-align: middle;
    `;

const CloseIcon = styled(motion.span)`
    color: #BEBEBE;
    font-size: 23px;
    margin-right: 20px;
    vertical-align: middle;
    transition: all 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        color: #DFDFDF;
    }
`;

const LineSeparator = styled.span`
    min-width: 100%;
    min-height: 2px;
    background-color: #D8D8D878;
    display: flex;
`;

const SearchContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    overflow-y: auto;           // Adds a vertical scroll bar as needed when results don't fit inside SearchInputContainer.
    box-sizing: border-box;     // Ensures the scroll bar fits inside the SearchInputContainer.
`;

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WarningMessage = styled.span`
    font-size: 14px;
    color: #A1A1A1;
    display: flex;
    align-self: center;
    justify-self: center;
`;

// Alternate CSS that determines height of search bar that will be applied based on value of animate prop passed to SearchBarContainer.
const containerVariants = {
    expanded: {
        height: "30em",
    },
    collapsed: {
        height: "3.8em",
    }
};

// Default animation with Framer Motion for the clicking outside container is a little choppy. We can fix that with the object below.
const containerTransition = { type: 'spring', damping: 22, stiffness: 150 };

export const SearchBar = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();  // This ref is associated with SearchBarContainer, knowing when user clicks outside.
    const inputRef = useRef();                          // This ref is associated with SearchInput, so it can clear text when user clicks outside.
    const [searchTerm, setSearchTerm] = useState('');   // Used in controlled component so it cannot be null, must be empty string.
    const [isLoading, setLoading] = useState(false);    // Indicates if we are waiting for data to load by displaying the Pacman spinner.
    const [tvShows, setTVShows] = useState([]);         // Holds array of search results when search term has been found by the API.
    const [noTVShows, setNoTVShows] = useState(false);  // State variable to indicate an unsuccessful search resulting in warning message.
    const isEmpty = !tvShows || tvShows.length === 0;   // Similar to noTVShows, except it can help distinguish when user has not started searching yet.

    const expandContainer = () => {
        setExpanded(true);
    };

    const collapseContainer = () => {
        setExpanded(false);     // Reset isExpanded state variable to false.
        setSearchTerm("");      // Reset searchTerm state variable to empty.
        setLoading(false);      // Stop the animated Pacman loader.
        setTVShows([]);         // Clear search results array.
        setNoTVShows(false);    // Reset noTVShows state variable to indicate possibility of finding shows to avoid displaying warnng message.
        if (inputRef.current) { inputRef.current.value = ""; }  // Clear search input field.
    };

    useEffect(() => {
        if (isClickedOutside) { collapseContainer(); }

    }, [isClickedOutside]);

    const prepareSearchQuery = (query) => {
        const url = `https://api.tvmaze.com/search/shows?q=${query}`;

        return encodeURI(url);
    };

    const searchTVShow = async () => {
        if (!searchTerm || searchTerm.trim() === "") { return; }

        setLoading(true);
        setNoTVShows(false);

        const URL = prepareSearchQuery(searchTerm);

        const response = await axios.get(URL).catch((err) => {
            console.log("Error:", err);     // This is a valid logging message to keep in the code.
        });

        if (response) {
            // console.log("Response:", response.data);    // Debugging: Check API response.
            if (response.data?.length === 0) { setNoTVShows(true); }
            setTVShows(response.data);
            setLoading(false);      // Stop the animated Pacman loader.
        }
    };

    // console.log(`Current search term: ${searchTerm}`);   // Debugging: Print search term as user enters it one character at a time.

    // Use our custom useDebounce hook to stall the API call until user has finished typing search term.
    useDebounce(searchTerm, searchTVShow, 500);

    const changeHandler = (event) => {
        event.preventDefault();
        if (event.target.value.trim() === "") { setNoTVShows(false); }
        setSearchTerm(event.target.value);
    };

    return (
        <SearchBarContainer
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={containerTransition}
            ref={parentRef}
        >
            <SearchInputContainer>
                <SearchIcon>
                    <IoSearch />
                </SearchIcon>
                <SearchInput
                    placeholder='Search for TV shows'
                    onFocus={expandContainer}
                    ref={inputRef}
                    value={searchTerm}
                    onChange={changeHandler}
                />
                <AnimatePresence>
                    {isExpanded && (
                        <CloseIcon
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <IoClose />
                        </CloseIcon>
                    )}
                </AnimatePresence>
            </SearchInputContainer>
            {isExpanded && <LineSeparator />}
            {isExpanded && (
                <SearchContent>
                    {isLoading && (
                        <LoadingWrapper>
                            <PacmanLoader loading color="purple" size={20} />
                        </LoadingWrapper>
                    )}
                    {!isLoading && isEmpty && !noTVShows && (
                        <LoadingWrapper>
                            <WarningMessage>Start typing the name of a TV show to begin search.</WarningMessage>
                        </LoadingWrapper>
                    )}
                    {!isLoading && noTVShows && (
                        <LoadingWrapper>
                            <WarningMessage>No TV shows or series found.</WarningMessage>
                        </LoadingWrapper>
                    )}
                    {!isLoading && !isEmpty && <>
                        {tvShows.map(({ show }) => (
                            <TVShow
                                key={show.id}
                                thumbnailSrc={show.image?.medium}
                                showName={show.name}
                                rating={show.rating?.average}
                            />
                        ))}
                    </>}
                </SearchContent>
            )}
        </SearchBarContainer>
    );

};